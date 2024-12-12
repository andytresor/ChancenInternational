import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Institution } from '../institutions/institution.entity'; // Adjust the path as necessary
import { Funding } from '../funding/funding.entity'; // Adjust the path as necessary
import { Repayment } from '../repayments/repayment.entity'; // Adjust the path as necessary
import { User } from 'src/auth/user.entity';

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

    @OneToOne(() => User, (user) => user.student, { eager: true })
    @JoinColumn() // Add this decorator
    user: User;

<<<<<<< HEAD
  @OneToMany(() => Funding, (funding) => funding.student, { eager: true }) // Eagerly load funding
    funding: Funding[];

  @OneToMany(() => Repayment, (repayment) => repayment.student)
  repayments: Repayment[];

  @ManyToOne(() => User, (user) => user.students, { eager: true }) @JoinColumn({ name: 'userId' }) // Clé étrangère pour la relation utilisateur 
  user: User; 
  @Column() 
  userId: number; // Colonne pour la clé étrangère
}
=======
    @Column({ default: false })
    isRepaymentActive: boolean;

    @OneToMany(() => Funding, (funding) => funding.student, { eager: true }) // Eagerly load funding

    funding: Funding[];

    @OneToMany(() => Repayment, (repayment) => repayment.student)
    repayments: Repayment[];
}
>>>>>>> origin/main
