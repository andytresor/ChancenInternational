import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { Institution } from '../institutions/institution.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
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

  async create(name: string, email: string, institutionId: number): Promise<Student> {
    const institution = await this.institutionRepository.findOne({ where: { id: institutionId } });
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${institutionId} not found`);
    }
    const student = this.studentRepository.create({ name, email, institution });
    return this.studentRepository.save(student);
  }

  async update(
    id: number,
    name?: string,
    email?: string,
    salary?: number,
    isRepaymentActive?: boolean,
  ): Promise<Student> {
    const student = await this.findOne(id);
    if (name) student.name = name;
    if (email) student.email = email;
    if (salary !== undefined) student.salary = salary;
    if (isRepaymentActive !== undefined) student.isRepaymentActive = isRepaymentActive;
    return this.studentRepository.save(student);
  }

  async delete(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }

  async findByInstitution(institutionId: number): Promise<Student[]> {
    return this.studentRepository.find({
      where: { institution: { id: institutionId } },
    });
  }
}
