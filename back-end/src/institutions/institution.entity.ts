import { courses } from 'src/courses/courses.entity';
import { Formulaire } from 'src/formulaire/formulaire.entity';
import { Student } from 'src/students/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Institution {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  // @OneToMany(() => Student, (student) => student.institution , {nullable:true})
  // students: Student[];

  // @Column()
  // student_id: number;

  @OneToMany(() => courses, (courses) => courses.institutions)
  courses: courses

  // @Column()
  // course_id: number;

  // @Column()
  // formulaire_id: number;

  // @OneToMany(() => Formulaire,(formulaire)=> formulaire.institution)
  // formulaire: Formulaire;
}
