import { Controller, Get, Post, Body, Param, Patch, BadRequestException } from '@nestjs/common';
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
        private readonly transactionService: TransactionService
    ) { }

    @Post('initialize')
    async initializePayment(@Body() payload: any) {
        const baseURL = this.configService.get<string>('PAYUNIT_URL');
        const apiKey = this.configService.get<string>('PAYUNIT_API_KEY');
        const auth = this.configService.get<string>('PAYUNIT_AUTH');

        const { total_amount, transaction_id, repaymentId, return_url, notify_url } = payload;

        // Ensure "payment_country" is included
        const requestData = {
            total_amount,
            currency: "XAF",
            transaction_id,
            return_url,
            notify_url,
            payment_country: "CM"
        };

        this.logger.log(`Initializing payment:`, requestData);

        try {
            // Fetch repayment entity to properly reference it
            const repayment = await this.transactionService.getRepaymentById(repaymentId);
            if (!repayment) {
                throw new BadRequestException("Repayment not found.");
            }

            // Check if a transaction already exists for this repayment
            const existingTransaction = await this.transactionService.getTransactionByRepaymentId(repaymentId);
            if (existingTransaction && existingTransaction.transactionStatus !== "FAILED") {
                throw new BadRequestException("A payment has already been initiated for this repayment.");
            }

            // Create and store the transaction
            const newTransaction = await this.transactionService.createTransaction({
                transactionId: transaction_id,
                transaction_amount: total_amount,
                currency: "XAF",
                transactionStatus: 'PENDING', // Use "PENDING" instead of "PROCESSING"
                repayment, // Pass full repayment entity
            });

            // Call PayUnit API
            const response = await axios.post(`${baseURL}/gateway/initialize`, requestData, {
                headers: {
                    "x-api-key": apiKey,
                    "mode": "sandbox",
                    "Content-Type": "application/json",
                    "Authorization": auth
                },
            });

            this.logger.log(`Payment initialized successfully:`, response.data);

            // Update transaction status if API call is successful
            await this.transactionService.updateTransactionStatus(transaction_id, 'PENDING');

            const transactionUrl = response.data.data.transaction_url;
            console.log(transactionUrl);


            return response.data;
        } catch (error) {
            this.logger.error(`Error initializing payment:`, error.response?.data || error.message);

            // ✅ Update transaction status in case of failure
            await this.transactionService.updateTransactionStatus(transaction_id, 'FAILED');

            throw new BadRequestException(error.response?.data?.message || "Payment initialization failed.");
        }
    }



    @Get('/:transactionId')
    async getTransaction(@Param('transactionId') transactionId: string): Promise<Transaction> {
        return this.transactionService.getTransactionById(transactionId);
    }

    @Patch('/:transactionId')
    async updateTransactionStatus(
        @Param('transactionId') transactionId: string,
        @Body('transactionStatus') status: 'PENDING' | 'FAILED' | 'CANCELLED' | 'SUCCESS',
    ): Promise<Transaction> {
        return this.transactionService.updateTransactionStatus(transactionId, status);
    }

    @Get('status/:transactionId')
    async getTransactionStatus(@Param('transactionId') transactionId: string) {
        return this.transactionService.getTransactionById(transactionId);
    }
}
