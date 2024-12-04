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

  @Column('decimal', { nullable: true })
  salary: number

  @ManyToOne(() => Institution, (institution) => institution.id, { eager: true })
  institution: Institution;

  @Column({ default: false })
  isRepaymentActive: boolean;

<<<<<<< HEAD
  @Column('decimal' , {nullable:true})
  salary:number;

  @OneToMany(() => Funding, (funding) => funding.student)
  funding: Funding[];
=======
  @OneToMany(() => Funding, (funding) => funding.student, { eager: true }) // Eagerly load funding
    funding: Funding[];
>>>>>>> origin/main

  @OneToMany(() => Repayment, (repayment) => repayment.student)
  repayments: Repayment[];
}