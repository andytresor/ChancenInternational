import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { StudentsModule } from './students/students.module';
import { FundingModule } from './funding/funding.module';
import { RepaymentsModule } from './repayments/repayments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pamelajo25',
      database: 'chancen_finances',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Only for development; disable in production
    }),
    AuthModule,
    InstitutionsModule,
    StudentsModule,
    FundingModule,
    RepaymentsModule,
  ],
  
})
export class AppModule {}
