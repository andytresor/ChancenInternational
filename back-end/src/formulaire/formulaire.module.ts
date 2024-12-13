import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormulaireController } from './formulaire.controller';
import { FormulaireService } from './formulaire.service';
import { Formulaire } from './formulaire.entity'; 
import { courses } from '../courses/courses.entity'
import { Institution } from 'src/institutions/institution.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Formulaire , courses , Institution])],
  controllers: [FormulaireController],
  providers: [FormulaireService],
})
export class FormulaireModule {}
