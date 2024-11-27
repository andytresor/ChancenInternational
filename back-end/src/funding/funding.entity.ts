import { Student } from 'src/students/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Funding {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.funding)
  student: Student;

  @Column('decimal')
  tuitionFees: number;

  @Column('decimal')
  financialAid: number;

  @Column('decimal')
  totalDebt: number;
}
