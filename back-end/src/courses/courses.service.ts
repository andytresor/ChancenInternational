import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { courses } from './courses.entity';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Institution } from '../institutions/institution.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(courses)
    private readonly courseRepository: Repository<courses>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  // Créer un nouveau cours
  async create(
    createCourseDto: CreateCourseDto
): Promise<courses> {

  console.log(createCourseDto);
  
    const institutions = await this.institutionRepository.findOne({ where: { id: createCourseDto.institution } });

    console.log(institutions);
    const{title , description,amount,institution, course} = createCourseDto
    
    // const course = this.courseRepository.create(createCourseDto);
    // const course = this.courseRepository.create({ ...createCourseDto, institutions: [institution] });
    // console.log(course);
    const courses = this.courseRepository.create({title , description, amount, institutions: [institution] });

    
    return await this.courseRepository.save(courses);
  }

  // Récupérer tous les cours
  async findAll(): Promise<courses[]> {
    return await this.courseRepository.find();
  }

  // Récupérer un cours par son ID
  async findOne(id: number): Promise<courses> {
    return await this.courseRepository.findOne({ where: { id }});
  }

  // Mettre à jour un cours
  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<courses> {
    const institution = updateCourseDto.institution_id ? await this.institutionRepository.findOne({ where: { id: updateCourseDto.institution_id } }) : null;
    // console.log(institution);
    const{title , description,amount,institution_id} = updateCourseDto

    const updateData = ({title , description,amount,institution_id , institutions: institution})
    // console.log(updateData);
    
    // const updateData = { ...updateCourseDto, institution };
   return await this.courseRepository.update(id, updateData).then(() => this.findOne(id));
    // return this.findOne(id);
  }

  // Supprimer un cours
  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
