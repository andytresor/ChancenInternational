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

    @Column()
    raison_de_la_demande: string;

  

    @ManyToOne(() => courses, (course) => course.formulaire)
    courses: courses;


    @ManyToOne(() => Institution, institution => institution.formulaires) 
    institution: Institution;
}