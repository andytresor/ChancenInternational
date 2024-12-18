import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/students/student.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: 'student' }) // Default role set to 'student'
    role: string;

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    }

    @OneToMany(() => Student, (student) => student.user)
    student: Student[];
    
     // Ajouter la propriété admin si elle n'existe pas 
    @Column({ default: false }) 
    admin: boolean;
}
