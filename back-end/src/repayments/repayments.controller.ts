import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { RepaymentsService } from './repayments.service';
import { Repayment } from './repayment.entity';

@Controller('repayments')
export class RepaymentsController {
  constructor(private readonly repaymentsService: RepaymentsService) {}

  @Get()
  async findAll(): Promise<Repayment[]> {
    return this.repaymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Repayment> {
    return this.repaymentsService.findOne(+id);
  }

  @Post('schedule')
  async createRepaymentSchedule(
    @Body() createDto: { fundingId: number; salary: number },
  ): Promise<Repayment[]> {
    const { fundingId, salary } = createDto;
    return this.repaymentsService.createRepaymentSchedule(fundingId, salary);
  }

  @Patch(':id/pay')
  async markAsPaid(@Param('id') id: string): Promise<Repayment> {
    return this.repaymentsService.markAsPaid(+id);
  }

  @Get('overdue')
  async getOverdueRepayments(): Promise<Repayment[]> {
    return this.repaymentsService.getOverdueRepayments();
  }

  @Get(':fundingId/remaining')
  async getRemainingRepayments(@Param('fundingId') fundingId: string): Promise<number> {
    return this.repaymentsService.getRemainingRepayments(+fundingId);
  }
}
