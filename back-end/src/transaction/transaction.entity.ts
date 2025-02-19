import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Repayment } from 'src/repayments/repayment.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transactionId: string;

  @Column()
  currency: string;

  @Column('decimal', { precision: 10, scale: 2 })
  transaction_amount: number;

  @Column({ default: 'PENDING' })
  transactionStatus: 'PENDING' | 'FAILED' | 'CANCELLED' | 'SUCCESS' | 'PROCESSING';

  @ManyToOne(() => Repayment, (repayment) => repayment.transactions, { onDelete: 'CASCADE' })
  repayment: Repayment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
