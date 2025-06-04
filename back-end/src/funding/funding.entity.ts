import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Student } from '../students/student.entity';
import { Repayment } from 'src/repayments/repayment.entity';

@Entity()
export class Funding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  tuitionFees: number;

  @Column('decimal')
  financialAid: number;

  @Column('decimal', { default: 0 })
  totalDebt: number;

  @Column('decimal', { nullable: true })
  amountRepaid: number;

  @Column('decimal', { nullable: true })
  remainingDebt: number;

  @OneToMany(() => Repayment, (repayment) => repayment.funding)
  repayment: Repayment[];

  @ManyToOne(() => Student, (student) => student.funding,)
  student: Student;

  @Column({ default: true })
  isActive: boolean; // Tracks if funding is actively being repaid
}