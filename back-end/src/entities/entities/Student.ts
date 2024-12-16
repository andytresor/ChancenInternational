import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Funding } from "./Funding";
import { Repayment } from "./Repayment";
import { Institution } from "./Institution";
import { User } from "./User";

@Entity("student", { schema: "public" })
export class Student {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("boolean", { name: "isRepaymentActive", default: () => "false" })
  isRepaymentActive: boolean;

  @Column("numeric", { name: "salary", nullable: true })
  salary: string | null;

  @OneToMany(() => Funding, (funding) => funding.student)
  fundings: Funding[];

  @OneToMany(() => Repayment, (repayment) => repayment.student)
  repayments: Repayment[];

  @ManyToOne(() => Institution, (institution) => institution.students)
  @JoinColumn([{ name: "institutionId", referencedColumnName: "id" }])
  institution: Institution;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
