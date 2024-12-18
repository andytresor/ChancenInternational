import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Repayment } from './repayment.entity';
import { Funding } from '../funding/funding.entity';

@Injectable()
export class RepaymentsService {
  constructor(
    @InjectRepository(Repayment)
    private readonly repaymentRepository: Repository<Repayment>,
    @InjectRepository(Funding)
    private readonly fundingRepository: Repository<Funding>,
  ) {}

  async findAll(): Promise<Repayment[]> {
    const repayments = await this.repaymentRepository.find({ relations: ["funding"] })
    return repayments.map(repay => ({
      ...repay,
      fundingId: repay.funding?.id || null,
    }))
  }

  async findOne(id: number): Promise<Repayment> {
    const repayment = await this.repaymentRepository.findOne({ where: { id } });
    if (!repayment) {
      throw new NotFoundException(`Repayment with ID ${id} not found`);
    }
    return repayment;
  }

  async createRepaymentSchedule(fundingId: number, salary: number): Promise<Repayment[]> {
    const funding = await this.fundingRepository.findOne({
      where: { id: fundingId },
      relations: ['student'],
    });
  
    if (!funding || !funding.student) {
      throw new NotFoundException(`Funding or related student not found`);
    }
  
    // Check if the student already has a repayment schedule
    const existingRepayment = await this.repaymentRepository.findOne({
      where: { student: { id: funding.student.id } },
    });
  
    if (existingRepayment) {
      throw new Error(`Repayment schedule already exists for student ID ${funding.student.id}`);
    }
  
    const monthlyRepayment = salary * 0.15;
    const totalDebt = funding.totalDebt - funding.amountRepaid;
    const numInstallments = Math.ceil(totalDebt / monthlyRepayment);
  
    const repayments: Repayment[] = [];
    const currentDate = new Date();
  
    for (let i = 0; i < numInstallments; i++) {
      const dueDate = new Date(currentDate);
      dueDate.setMonth(currentDate.getMonth() + i + 1);
  
      const repayment = this.repaymentRepository.create({
        funding,
        amount: monthlyRepayment,
        dueDate,
        isPaid: false,
        student: funding.student, // Associate the student
      });
  
      repayments.push(await this.repaymentRepository.save(repayment));
    }
  
    return repayments;
  }
  
  async markAsPaid(id: number): Promise<Repayment> {
    const repayment = await this.findOne(id);
    if (repayment.isPaid) {
      throw new Error(`Repayment with ID ${id} is already marked as paid`);
    }
    repayment.isPaid = true;
    repayment.paymentDate = new Date();
    return this.repaymentRepository.save(repayment);
  }

  async getOverdueRepayments(): Promise<Repayment[]> {
    const today = new Date();
    return this.repaymentRepository.find({
      where: {
        isPaid: false,
        dueDate: LessThan(today),
      },
    });
  }

  async getRemainingRepayments(fundingId: number): Promise<number> {
    const funding = await this.fundingRepository.findOne({ where: { id: fundingId } });
    if (!funding) {
      throw new NotFoundException(`Funding with ID ${fundingId} not found`);
    }
    const remainingRepayments = await this.repaymentRepository.count({
      where: {
        funding: { id: fundingId },
        isPaid: false,
      },
    });
    return remainingRepayments;
  }
}
