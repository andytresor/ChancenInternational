import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";

@Index("UQ_e12875dfb3b1d92d7d7c5377e22", ["email"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "email", unique: true })
  email: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "role", default: () => "'student'" })
  role: string;

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];
}
