import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { Student } from './student.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Formulaire } from 'src/formulaire/formulaire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Formulaire]), 
    AuthModule,
    InstitutionsModule, // Import InstitutionsModule for linking
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports:[TypeOrmModule]

})

export class StudentsModule {}
