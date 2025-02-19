import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { StudentsModule } from './students/students.module';
import { FundingModule } from './funding/funding.module';
import { RepaymentsModule } from './repayments/repayments.module';
import { FormulaireModule } from './formulaire/formulaire.module';
import { CoursesModule } from './courses/courses.module';
import { courses } from './courses/courses.entity';
import { Formulaire } from './formulaire/formulaire.entity';
import { Student } from './students/student.entity';
import { Institution } from './institutions/institution.entity';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'chancen_finances',
      migrations: ['src/migrations/*.ts'],
      entities:[courses,Formulaire,Student,Institution],
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Only for development; disable in production
    }),
    AuthModule,
    InstitutionsModule,
    StudentsModule,
    FundingModule,
    RepaymentsModule,
    FormulaireModule,
    CoursesModule,
    TransactionModule,
  ],
  
})
export class AppModule {}
