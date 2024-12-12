import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { Student } from './student.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]), 
    AuthModule,
    InstitutionsModule, // Import InstitutionsModule for linking
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports:[TypeOrmModule]

})

export class StudentsModule {}
