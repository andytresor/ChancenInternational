import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funding } from './funding.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class FundingsService {
  constructor(
    @InjectRepository(Funding)
    private readonly fundingRepository: Repository<Funding>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  async findAll(): Promise<any[]> {
    const fundings = await this.fundingRepository.find({ relations: ['student', 'student.institution'] });
    return fundings.map(funding => ({
      ...funding,
      studentId: funding.student?.id || null, // Extract the student ID
      institutionName: funding.student?.institution?.name || "Not Available", // Extract the institution name
    }));
  }

  async findOne(id: number): Promise<Funding> {
    const funding = await this.fundingRepository.findOne({ where: { id } });
    if (!funding) {
      throw new NotFoundException(`Funding with ID ${id} not found`);
    }
    return funding;
  }

  async create(
    studentId: number,
    tuitionFees: number,
    financialAid: number,
  ): Promise<Funding> {
    // Check if the student has already been funded
    const existingFunding = await this.checkIfStudentAlreadyFunded(studentId);
    if (existingFunding) {
      throw new Error(`Student with ID ${studentId} has already been funded.`);
    }

    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const totalDebt = tuitionFees + financialAid + ((tuitionFees + financialAid) * 0.2);

    const funding = this.fundingRepository.create({
      student,
      tuitionFees,
      financialAid,
      totalDebt,
      amountRepaid: 0,
      isActive: true,
    });

    return this.fundingRepository.save(funding);
  }

  async checkIfStudentAlreadyFunded(studentId: number): Promise<Funding | null> {
    return this.fundingRepository.findOne({
      where: { student: { id: studentId }, isActive: true },
      relations: ['student'],
    });
  }

  async updateRepayment(id: number, amountRepaid: number): Promise<Funding> {
    const funding = await this.findOne(id);

    funding.amountRepaid += amountRepaid;

    if (funding.amountRepaid >= funding.totalDebt) {
      funding.isActive = false;
    }

    return this.fundingRepository.save(funding);
  }

  async suspendRepayment(id: number): Promise<Funding> {
    const funding = await this.findOne(id);
    funding.isActive = false;
    return this.fundingRepository.save(funding);
  }

  async resumeRepayment(id: number): Promise<Funding> {
    const funding = await this.findOne(id);
    funding.isActive = true;
    return this.fundingRepository.save(funding);
  }

  async calculateRemainingDebt(id: number): Promise<number> {
    const funding = await this.findOne(id);
    return funding.totalDebt - funding.amountRepaid;
  }

  async calculateRepaymentPercentage(id: number): Promise<number> {
    const funding = await this.findOne(id);
    return (funding.amountRepaid / funding.totalDebt) * 100;
  }

  async findByUserId(userId: number): Promise<Funding[]> {
    console.log("Querying fundings for user ID:", userId);
    const result = await this.fundingRepository.find({
      where: { student: { user: { id: userId } } },
      relations: ['student', 'student.user', 'student.institution'],
    });
    console.log("Funding Query Result:", result);
    return result;
}
  }

export default FundingsService