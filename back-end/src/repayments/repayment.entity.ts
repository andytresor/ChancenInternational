import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Funding } from '../funding/funding.entity';
import { Student } from 'src/students/student.entity';

@Entity()
export class Repayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column('date')
  dueDate: Date;

  @Column('boolean', { default: false })
  isPaid: boolean;

  @Column('date', { nullable: true })
  paymentDate: Date;

  @ManyToOne(() => Funding, (funding) => funding.id, { eager: true })
  funding: Funding;

  @ManyToOne(() => Student, (student) => student.repayments, { eager: true })
  student: Student;

}
