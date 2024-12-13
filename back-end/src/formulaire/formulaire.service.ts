import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulaire } from './formulaire.entity';
import { CreateFormulaireDto } from '../dto/create-formulaire.dto';
import { UpdateFormulaireDto } from '../dto/update-formulaire.dto';
import { courses } from '../courses/courses.entity';
import { Institution } from '../institutions/institution.entity';

@Injectable()
export class FormulaireService {
  constructor(
    @InjectRepository(Formulaire)
    private readonly formulaireRepository: Repository<Formulaire>,
    @InjectRepository(courses)
    private readonly courseRepository: Repository<courses>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  // Créer un nouveau formulaire
  async create(createFormulaireDto: CreateFormulaireDto): Promise<Formulaire> {
    const course = await this.courseRepository.findOne({ where: { id: createFormulaireDto.course_id } });
    const institution = await this.institutionRepository.findOne({ where: { id: createFormulaireDto.institution_id } });
    // const formulaire = this.formulaireRepository.create({ ...createFormulaireDto, courses: course ?[course] :[], institution });
    const {name,email,contact,raison_de_la_demande,course_id,institution_id}=createFormulaireDto
    const formulaire = this.formulaireRepository.create({name,email,contact,raison_de_la_demande,course_id,institution_id , institution})
    return await this.formulaireRepository.save(formulaire);
  }

  // Récupérer tous les formulaires
  async findAll(): Promise<Formulaire[]> {
    return await this.formulaireRepository.find();
  }

  // Récupérer un formulaire par son ID
  async findOne(id: number): Promise<Formulaire> {
    return await this.formulaireRepository.findOne({ where: { id } });
  }

  // Mettre à jour un formulaire
  async update(id: number, updateFormulaireDto: UpdateFormulaireDto): Promise<Formulaire> {
    const course = updateFormulaireDto.course_id ? await this.courseRepository.findOne({ where: { id: updateFormulaireDto.course_id } }) : null;
    const institution = updateFormulaireDto.institution_id ? await this.institutionRepository.findOne({ where: { id: updateFormulaireDto.institution_id } }) : null;

    const{name,email,contact,raison_de_la_demande,course_id,institution_id} = updateFormulaireDto
    const updateData = ({name,email,contact,raison_de_la_demande,course_id,institution_id,institution})
    // const updateData :Partial<Formulaire> = { ...updateFormulaireDto, courses: course ? [course] : [], institution  };
    return  await this.formulaireRepository.update(id, updateData).then(() => this.findOne(id));
  
  }

  // Supprimer un formulaire
  async remove(id: number): Promise<void> {
    await this.formulaireRepository.delete(id);
  }
}
