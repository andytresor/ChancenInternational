import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";
import { Repayment } from "./Repayment";

@Entity("funding", { schema: "public" })
export class Funding {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", { name: "tuitionFees" })
  tuitionFees: string;

  @Column("numeric", { name: "financialAid" })
  financialAid: string;

  @Column("numeric", { name: "totalDebt", default: () => "'0'" })
  totalDebt: string;

  @Column("numeric", { name: "amountRepaid", nullable: true })
  amountRepaid: string | null;

  @Column("boolean", { name: "isActive", default: () => "true" })
  isActive: boolean;

  @ManyToOne(() => Student, (student) => student.fundings)
  @JoinColumn([{ name: "studentId", referencedColumnName: "id" }])
  student: Student;

  @OneToMany(() => Repayment, (repayment) => repayment.funding)
  repayments: Repayment[];
}
