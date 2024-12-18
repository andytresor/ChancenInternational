import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { courses } from "src/courses/courses.entity";
import { Institution } from "src/institutions/institution.entity";

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

    @Column({nullable:false , default: 'raison par défaut' })
    reason: string;

    @Column({ nullable: true })
    generatedPassword: string;

    @ManyToOne(() => courses, (course) => course.id, { eager: true })
    course: courses;

    @ManyToOne(() => Institution, (institution) => institution.id, { eager: true })
    institution: Institution;
} 