import { Module } from '@nestjs/common';
import { FundingService } from './funding.service';
import { FundingController } from './funding.controller';

@Module({
  providers: [FundingService],
  controllers: [FundingController]
})
export class FundingModule {}
