import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Institution } from '../institutions/institution.entity'; // Adjust the path as necessary
import { Funding } from '../funding/funding.entity'; // Adjust the path as necessary
import { Repayment } from '../repayments/repayment.entity'; // Adjust the path as necessary

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Institution, (institution) => institution.students)
  institution: Institution;

  @Column('decimal') 

  @Column({ default: true })
  isRepaymentActive: boolean;

  @OneToMany(() => Funding, (funding) => funding.student)
  funding: Funding[];

  @OneToMany(() => Repayment, (repayment) => repayment.student)
  repayments: Repayment[];
}