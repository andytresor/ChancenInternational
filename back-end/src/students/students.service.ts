import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { Institution } from '../institutions/institution.entity';
import { User } from 'src/auth/user.entity';
import { Formulaire } from 'src/formulaire/formulaire.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(Formulaire)
    private readonly formulaireRepository: Repository<Formulaire>,
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
    // Check for an existing student with the same userId
    const existingStudent = await this.studentRepository.findOne({
      where: { user: { id: data.userId } },
      relations: ['user'], // Include user relation to check userId
    });

    if (existingStudent) {
      throw new Error('A student with this user already exists.');
    }

    // Create a new student instance
    const student = new Student();
    student.name = data.name;
    student.email = data.email;
    student.salary = data.salary;

    // Set the institution
    student.institution = await this.institutionRepository.findOne({
      where: { id: data.institutionId },
    });

    if (!student.institution) {
      throw new Error('Institution not found.');
    }

    // Set the user if userId is provided
    if (data.userId) {
      const user = await this.userRepository.findOne({
        where: { id: data.userId },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      student.user = user;
    }

    // Save the new student
    const savedStudent = await this.studentRepository.save(student);

    // Link any Formulaires with the temporaryStudentId to this student
    if (data.temporaryStudentId) {
      await this.linkFormulairesToStudent(savedStudent.id, data.temporaryStudentId);
    }

    return savedStudent;
  }

  async updateStudent(id: number, data: any): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    student.name = data.name || student.name;
    student.email = data.email || student.email;
    student.salary = data.salary !== undefined ? data.salary : student.salary;

    // Activate repayment if salary is set
    if (data.salary !== undefined) {
      student.isRepaymentActive = true;
    }

    student.institution = data.institutionId
      ? await this.institutionRepository.findOne({ where: { id: data.institutionId } })
      : student.institution;

    return this.studentRepository.save(student);
  }

  async linkFormulairesToStudent(studentId: number, temporaryStudentId: string): Promise<void> {
    const result = await this.formulaireRepository.update(
      { temporaryStudentId }, // Find all Formulaires with the temporaryStudentId
      { student: { id: studentId }, temporaryStudentId: null }, // Link to student and clear the temporary ID
    );

    if (result.affected === 0) {
      throw new NotFoundException(`No Formulaires found with temporaryStudentId: ${temporaryStudentId}`);
    }
  }

  async deleteStudent(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
