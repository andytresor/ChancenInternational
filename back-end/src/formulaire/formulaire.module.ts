import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormulaireController } from './formulaire.controller';
import { FormulaireService } from './formulaire.service';
import { Formulaire } from './formulaire.entity'; 
import { courses } from '../courses/courses.entity'
import { Institution } from 'src/institutions/institution.entity';
import { User } from 'src/auth/user.entity';
import { MailerService } from 'src/auth/Mailer.service';


@Module({
  imports: [TypeOrmModule.forFeature([Formulaire , courses , Institution, User])],
  controllers: [FormulaireController],
  providers: [FormulaireService, MailerService],
})
export class FormulaireModule {}
