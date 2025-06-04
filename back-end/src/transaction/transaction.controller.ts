import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller('transactions')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(
    private configService: ConfigService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post('initialize')
  async initializePayment(@Body() payload: any) {
    const {
      total_amount,
      transaction_id,
      repaymentId,
      return_url,
      notify_url,
    } = payload;

    // Ensure "payment_country" is included
    const requestData = {
      total_amount,
      currency: 'XAF',
      transaction_id,
      return_url,
      notify_url,
      payment_country: 'CM',
    };

    this.logger.log(`Initializing payment:`, requestData);

    try {
      // Fetch repayment entity to properly reference it
      const repayment =
        await this.transactionService.getRepaymentById(repaymentId);
      if (!repayment) {
        throw new BadRequestException('Repayment not found.');
      }

      // Check if a transaction already exists for this repayment
      const existingTransaction =
        await this.transactionService.getTransactionByRepaymentId(repaymentId);
      if (
        existingTransaction &&
        existingTransaction.transactionStatus !== 'FAILED'
      ) {
        throw new BadRequestException(
          'A payment has already been initiated for this repayment.',
        );
      }

      // Create and store the transaction
      await this.transactionService.createTransaction({
        transactionId: transaction_id,
        transaction_amount: total_amount,
        currency: 'XAF',
        transactionStatus: 'PENDING', // Use "PENDING" instead of "PROCESSING"
        repayment, // Pass full repayment entity
      });

      const response =
        await this.transactionService.initiatePayment(requestData);

      this.logger.log(`Payment initialized successfully:`, response);

    } catch (error) {
      this.logger.error('Error initializing payment:', error.response?.data || error.message, );

      // Try to mark transaction as FAILED if it exists
      try {

        const existingTransaction = await this.transactionService.getTransactionById(transaction_id);

        if (existingTransaction) {
          await this.transactionService.updateTransactionStatus(transaction_id, 'FAILED' );
        }
      } catch (error)
       {
        this.logger.log( `Failed to mark transaction ${transaction_id} as FAILED:`);
      }
      throw new BadRequestException(
        error.response?.data?.message || 'Payment initialization failed.',
      );
    }
  }

  @Get('/:transactionId')
  async getTransaction(
    @Param('transactionId') transactionId: string,
  ): Promise<Transaction> {
    return this.transactionService.getTransactionById(transactionId);
  }

  @Patch('/:transactionId')
  async updateTransactionStatus(
    @Param('transactionId') transactionId: string,
    @Body('transactionStatus')
    status: 'PENDING' | 'FAILED' | 'CANCELLED' | 'SUCCESS',
  ): Promise<Transaction> {
    return this.transactionService.updateTransactionStatus(
      transactionId,
      status,
    );
  }

  @Get('status/:transactionId')
  async getTransactionStatus(@Param('transactionId') transactionId: string) {
    return this.transactionService.getTransactionById(transactionId);
  }
}
