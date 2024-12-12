import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { Institution } from '../institutions/institution.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async createStudent(data: any): Promise<Student> {
    const student = new Student();
    student.name = data.name;
    student.email = data.email;
    student.salary = data.salary;
    student.institution = await this.institutionRepository.findOne({ where: { id: data.institutionId } });

    if (data.userId) {
        student.user = await this.userRepository.findOne({ where: { id: data.userId } });
    }

    return this.studentRepository.save(student);
}

async updateStudent(id: number, data: any): Promise<Student> {
  const student = await this.studentRepository.findOne({ where: { id } });

  student.name = data.name;
  student.email = data.email;
  student.salary = data.salary;
  student.institution = await this.institutionRepository.findOne({ where: { id: data.institutionId } });

  if (data.userId) {
      student.user = await this.userRepository.findOne({ where: { id: data.userId } });
  }

  return this.studentRepository.save(student);
}

  // async delete(id: number): Promise<void> {
  //   const result = await this.studentRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Student with ID ${id} not found`);
  //   }
  // }

  // async findByInstitution(institutionId: number): Promise<Student[]> {
  //   return this.studentRepository.find({
  //     where: { institution: { id: institutionId } },
  //   });
  // }
}
