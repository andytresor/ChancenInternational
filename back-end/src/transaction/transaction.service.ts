import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Repayment } from 'src/repayments/repayment.entity';
import { ConfigService } from '@nestjs/config';
import { Funding } from 'src/funding/funding.entity';
import { PayunitClient } from '@payunit/nodejs-sdk';
import * as appConfig from '../config';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  private payunitClient: PayunitClient;

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(Repayment)
    private readonly repaymentRepository: Repository<Repayment>,

    @InjectRepository(Funding)
    private readonly fundingRepository: Repository<Funding>,

    private readonly configService: ConfigService,
  ) {
    const { apiUsername, apiPassword, apiKey, mode } = appConfig.payunit_config;

    // Log the configuration values
    this.logger.log(' PayUnit config:', appConfig.payunit_config);

    // Validate the configuration
    if (!apiUsername || !apiPassword || !apiKey || !mode) {
      throw new Error(' Missing one or more PayUnit credentials');
    }

    try {
      this.payunitClient = new PayunitClient({
        apiUsername,
        apiPassword,
        apiKey,
        mode: 'test',
      });

      this.logger.log('✅ PayUnit client initialized successfully');
    } catch (error) {
      this.logger.error(' Failed to initialize PayUnit client');
      throw new Error('Failed to initialize PayUnit client');
    }
  }



  async createTransaction(
    createDto: Partial<Transaction>,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createDto);
    return this.transactionRepository.save(transaction);
  }

  async initiatePayment(payload: any) {
    const response = await this.payunitClient.collections.initiatePayment(payload); // Update transaction status if API call is successful

    this.logger.log('Initiate Payment Response:', response);

    const transactionId = payload.transaction_id;
    if (!transactionId) {
      throw new Error('Missing transaction_id in PayUnit response');
    }

    await this.updateTransactionStatus(transactionId, 'PENDING');

    this.logger.log('Transaction Url:', response.transaction_url);
    return response;
  }

  async getRepaymentById(repaymentId: number): Promise<Repayment | null> {
    return this.repaymentRepository.findOne({ where: { id: repaymentId } });
  }

  async getTransactionByRepaymentId(
    repaymentId: number,
  ): Promise<Transaction | null> {
    return this.transactionRepository.findOne({
      where: { repayment: { id: repaymentId } },
    });
  }

  async getTransactionById(transactionId: string): Promise<Transaction> {
    return this.transactionRepository.findOne({ where: { transactionId } });
  }

  async updateTransactionStatus(
    transactionId: string,
    status: 'PENDING' | 'FAILED' | 'CANCELLED' | 'SUCCESS',
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(transactionId);
    if (!transaction) throw new Error('Transaction not found');
    transaction.transactionStatus = status;
    return this.transactionRepository.save(transaction);
  }

  @Cron('*/3 * * * *') // Runs every 3 minutes
  async checkAndUpdateTransactions() {
    this.logger.log('Cron job executed at ' + new Date().toISOString());

    const pendingTransactions = await this.transactionRepository.find({
      where: { transactionStatus: 'PENDING' },
      relations: ['repayment', 'repayment.funding'], // Include the repayment relation
    });

    this.logger.log(`Found ${pendingTransactions.length} pending transactions.`, );

    for (const transaction of pendingTransactions) {
      try {
        this.logger.log( `Checking status for transaction: ${transaction.transactionId}`, );

        const response = await this.payunitClient.collections.getTransactionStatus(transaction.transactionId);

        const { transaction_status } = response;

        if (transaction_status === 'SUCCESS') {
          await this.updateTransactionStatus(transaction.transactionId, transaction_status );

          const repayment = transaction.repayment;
          repayment.isPaid = true;
          repayment.paymentDate = new Date();
          repayment.funding.amountRepaid =
            Number(repayment.funding.amountRepaid) + Number(repayment.amount);
          repayment.funding.remainingDebt =
            Number(repayment.funding.totalDebt) -
            Number(repayment.funding.amountRepaid);

          await this.repaymentRepository.save(repayment);
          await this.fundingRepository.save(repayment.funding);

          this.logger.log(
            `Transaction ${transaction.transactionId} and Repayment ${repayment.id} status updated to ${transaction_status}`,
          );
        }
      } catch (error) {
        this.logger.error(
          `Failed to update transaction ${transaction.transactionId}:`,
          error.response?.data || error.message,
        );
      }
    }
  }
}
