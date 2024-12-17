import { courses } from 'src/courses/courses.entity';
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


  @OneToMany(() => courses, (courses) => courses.institutions)
  courses: courses

}
