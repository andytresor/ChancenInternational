import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Funding } from '../funding/funding.entity';

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
}
