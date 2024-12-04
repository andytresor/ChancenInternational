import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { Student } from './student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]), 
    InstitutionsModule, // Import InstitutionsModule for linking
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports:[TypeOrmModule]

})

export class StudentsModule {}
