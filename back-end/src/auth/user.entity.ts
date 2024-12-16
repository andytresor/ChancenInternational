import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
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

    @Column({ default: 'student' }) // Default role set to 'student'
    role: string;

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    }

    @OneToOne(() => Student, (student) => student.user)
    student: Student[];
}
