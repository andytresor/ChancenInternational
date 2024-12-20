import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Institution } from '../institutions/institution.entity'; // Adjust the path as necessary
import { Funding } from '../funding/funding.entity'; // Adjust the path as necessary
import { Repayment } from '../repayments/repayment.entity'; // Adjust the path as necessary
import { User } from 'src/auth/user.entity';
import { Formulaire } from 'src/formulaire/formulaire.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  email: string;

  @Column('decimal', { nullable: true })
  salary: number;

  @ManyToOne(() => Institution, (institution) => institution.id, { eager: true })
  institution: Institution;

  @ManyToOne(() => User, (user) => user.student, { onDelete: 'CASCADE' })
  user: User;

  @Column({ default: false })
  isRepaymentActive: boolean;

  @OneToMany(() => Funding, (funding) => funding.student, { eager: true })
  funding: Funding[]; // Corrected to an array

  @OneToMany(() => Repayment, (repayment) => repayment.student)
  repayments: Repayment[];

}
