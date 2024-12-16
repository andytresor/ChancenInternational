import { Formulaire } from "src/formulaire/formulaire.entity";
import { Institution } from "src/institutions/institution.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class courses {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    amount:number; 

    @OneToMany(() => Formulaire, Formulaire => Formulaire.course) 
    formulaire: Formulaire;

    // @Column()
    // formulaire_id: number;

    @ManyToOne(() => Institution, (institution) => institution.courses)
    institutions: Institution;
}
