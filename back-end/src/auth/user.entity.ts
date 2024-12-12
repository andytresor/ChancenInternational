<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
>>>>>>> origin/main
import { Exclude } from 'class-transformer';
import { Student } from 'src/students/student.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

<<<<<<< HEAD
  @Column({ default: 'student' })
  role: 'admin' | 'student';

  @OneToMany(() => Student, (student) => student.user) 
  students: Student[];
=======
    @Column({ default: 'student' })
    role: 'admin' | 'student';

    @OneToOne(() => Student, (student) => student.user)
    student: Student[];
>>>>>>> origin/main
}
