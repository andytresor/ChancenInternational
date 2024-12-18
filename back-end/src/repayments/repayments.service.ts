import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Repayment } from './repayment.entity';
import { Funding } from '../funding/funding.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class RepaymentsService {
  constructor(
    @InjectRepository(Repayment)
    private readonly repaymentRepository: Repository<Repayment>,
    @InjectRepository(Funding)
    private readonly fundingRepository: Repository<Funding>,
   @InjectRepository(Student)
       private readonly studentRepository: Repository<Student>,
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

  async createRepaymentSchedule(fundingId: number, salary: number , studentId:number): Promise<Repayment[]> {
    const funding = await this.fundingRepository.findOne({ where: { id: fundingId } });
    if (!funding) {
      throw new NotFoundException(`Funding with ID ${fundingId} not found`);
    }
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const monthlyRepayment = salary * 0.15; // 15% of monthly salary
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
        student,
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

  async findByUserId(userId: string): Promise<Repayment[]> { 
    return this.repaymentRepository.find({ 
      where: { student: { user: { id: Number(userId) } } }, 
      relations: ['student', 'student.user'], // Assure-toi de charger les relations nécessaires 
      }); 
    }
}
