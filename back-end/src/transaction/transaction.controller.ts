import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { Logger } from '@nestjs/common';
import axios from 'axios';

@Controller('transactions')
export class TransactionController {
    private readonly logger = new Logger(TransactionController.name);

    constructor(private readonly transactionService: TransactionService) { }

    @Post('initialize')
    async initializePayment(@Body() payload: any) {
        const baseURL = 'https://gateway.payunit.net/api';

        const { total_amount, transaction_id } = payload;

    // Log the total_amount and transaction_id
    this.logger.log(`Initializing payment with total_amount: ${total_amount}, transaction_id: ${transaction_id}`);

        try {
            const response = await axios.post(`${baseURL}/gateway/initialize`, payload, {
                headers: {
                    "Access-Control-Allow-Origin": "* ",
                    "Authorization": `Basic Njc2MDRkMzYtMWE4MS00Nzk1LWFmNjMtOGI4MDhkODY2Y2YyOjcxZDc1OTdlLTMwMGItNDVmMC1iYTQ5LTFiMWUzMTM2NDA5Yg==`,
                    'Content-Type': 'application/json',
                    'x-api-key': 'sand_YlIc0dtQ9xhCyU0MYcNvHGqOJo5EAI',
                    "mode": "sandbox"
                },
            });

            // Return PayUnit's response to the frontend
            return response.data;
        } catch (error) {
            console.error("Error initializing payment with PayUnit:", error);
            throw new Error("Payment initialization failed");
        }
    }

    @Post()
    async createTransaction(@Body() createDto: Partial<Transaction>): Promise<Transaction> {
        return this.transactionService.createTransaction(createDto);
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
