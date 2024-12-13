import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@Entity("institution", { schema: "public" })
export class Institution {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "location" })
  location: string;

  @OneToMany(() => Student, (student) => student.institution)
  students: Student[];
}
