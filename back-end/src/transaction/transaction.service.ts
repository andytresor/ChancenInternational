import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Repayment } from 'src/repayments/repayment.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(Repayment)
    private readonly repaymentRepository: Repository<Repayment>,

    private configService: ConfigService
  ) { }

  async createTransaction(createDto: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createDto);
    return this.transactionRepository.save(transaction);
  }

  async getRepaymentById(repaymentId: number): Promise<Repayment | null> {
    return this.repaymentRepository.findOne({ where: { id: repaymentId } });
  }

  async getTransactionByRepaymentId(repaymentId: number): Promise<Transaction | null> {
    return this.transactionRepository.findOne({
      where: { repayment: { id: repaymentId } },
    });
  }

  async getTransactionById(transactionId: string): Promise<Transaction> {
    return this.transactionRepository.findOne({ where: { transactionId } });
  }

  async updateTransactionStatus(transactionId: string, status: "PENDING" | "FAILED" | "CANCELLED" | "SUCCESS"): Promise<Transaction> {
    const transaction = await this.getTransactionById(transactionId);
    if (!transaction) throw new Error('Transaction not found');
    transaction.transactionStatus = status;
    return this.transactionRepository.save(transaction);
  }

  @Cron('*/3 * * * *') // Runs every 15 minutes
  async checkAndUpdateTransactions() {
    const apiKey = this.configService.get<string>('PAYUNIT_API_KEY');
    const auth = this.configService.get<string>('PAYUNIT_AUTH');
    this.logger.log("Cron job executed at " + new Date().toISOString());

    const pendingTransactions = await this.transactionRepository.find({
      where: { transactionStatus: "PENDING" },
    });

    this.logger.log(`Found ${pendingTransactions.length} pending transactions.`);

    for (const transaction of pendingTransactions) {
      try {
        this.logger.log(`Checking status for transaction: ${transaction.transactionId}`);

        const response = await axios.get(
          `https://gateway.payunit.net/api/gateway/paymentstatus/${transaction.transactionId}`,
          {
            headers: {
              "x-api-key": apiKey,
              "mode": "sandbox",
              "Content-Type": "application/json",
              "Authorization": auth
            },
          }
        );

        const { transaction_status } = response.data.data;

        if (transaction_status) {
          await this.updateTransactionStatus(transaction.transactionId, transaction_status);
          this.logger.log(
            `Transaction ${transaction.transactionId} status updated to ${transaction_status}`
          );
        }
      } catch (error) {
        this.logger.error(
          `Failed to update transaction ${transaction.transactionId}:`,
          error.response?.data || error.message
        );
      }
    }
  }
}
