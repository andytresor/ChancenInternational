import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
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

    @Column({ default: 'student' })
    role: 'admin' | 'student';

    @OneToOne(() => Student, (student) => student.user)
    student: Student[];
}
