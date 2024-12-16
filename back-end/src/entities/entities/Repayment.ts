import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Funding } from "./Funding";
import { Student } from "./Student";

@Entity("repayment", { schema: "public" })
export class Repayment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", { name: "amount" })
  amount: string;

  @Column("date", { name: "dueDate" })
  dueDate: string;

  @Column("boolean", { name: "isPaid", default: () => "false" })
  isPaid: boolean;

  @Column("date", { name: "paymentDate", nullable: true })
  paymentDate: string | null;

  @ManyToOne(() => Funding, (funding) => funding.repayments)
  @JoinColumn([{ name: "fundingId", referencedColumnName: "id" }])
  funding: Funding;

  @ManyToOne(() => Student, (student) => student.repayments)
  @JoinColumn([{ name: "studentId", referencedColumnName: "id" }])
  student: Student;
}
