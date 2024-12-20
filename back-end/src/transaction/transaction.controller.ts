import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import axios from 'axios';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post('initialize')
    async initializePayment(@Body() payload: any) {
        const baseURL = 'https://gateway.payunit.net/api';

        try {
            const response = await axios.post(`${baseURL}/gateway/initialize`, payload, {
                headers: {
                    "Access-Control-Allow-Origin": "* ",
                    "Authorization": `Basic Njc2MDRkMzYtMWE4MS00Nzk1LWFmNjMtOGI4MDhkODY2Y2YyOjcxZDc1OTdlLTMwMGItNDVmMC1iYTQ5LTFiMWUzMTM2NDA5Yg==`,
                    "x-api-key": "sand_YlIc0dtQ9xhCyU0MYcNvHGqOJo5EAI",
                    "Content-Type": "application/json",
                    "mode": "live"
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
