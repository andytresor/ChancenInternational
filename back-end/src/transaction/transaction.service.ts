import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(createDto: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createDto);
    return this.transactionRepository.save(transaction);
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

  @Cron('*/15 * * * *') // Runs every 15 minutes
  async checkAndUpdateTransactions() {
    const pendingTransactions = await this.transactionRepository.find({
      where: { transactionStatus: 'PENDING' },
    });

    for (const transaction of pendingTransactions) {
      try {
        const response = await axios.get(
          `https://gateway.payunit.net/api/gateway/paymentstatus/${transaction.transactionId}`,
        );

        const { transaction_status } = response.data.data;
        if (transaction_status) {
          await this.updateTransactionStatus(transaction.transactionId, transaction_status);
          this.logger.log(
            `Transaction ${transaction.transactionId} status updated to ${transaction_status}`,
          );
        }
      } catch (error) {
        this.logger.error(`Failed to update transaction ${transaction.transactionId}`, error);
      }
    }
  }
}
