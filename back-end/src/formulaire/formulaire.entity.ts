import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { courses } from 'src/courses/courses.entity';
import { Institution } from 'src/institutions/institution.entity';
import { Student } from 'src/students/student.entity';

@Entity()
export class Formulaire {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    contact: string;

    @Column()
    reason: string;


    @ManyToOne(() => Student, (student) => student.formulaire, { nullable: true, onDelete: 'SET NULL' })
    student: Student;

    @Column({ nullable: true })
    generatedPassword: string;

    @ManyToOne(() => courses, (course) => course.formulaire, { eager: true })
    course: courses;

    @ManyToOne(() => Institution, (institution) => institution.id, { eager: true })
    institution: Institution;
}
