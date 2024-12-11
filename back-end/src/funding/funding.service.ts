import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funding } from './funding.entity';
import { Student } from '../students/student.entity';
import { log } from 'console';

@Injectable()
export class FundingsService {
  constructor(
    @InjectRepository(Funding)
    private readonly fundingRepository: Repository<Funding>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Funding[]> {
    return this.fundingRepository.find();
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
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const totalDebt = tuitionFees + financialAid + ( (tuitionFees + financialAid) * 0.2);

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
}

export default FundingsService