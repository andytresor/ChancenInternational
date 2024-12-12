import { Formulaire } from "src/formulaire/formulaire.entity";
import { Institution } from "src/institutions/institution.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column() 
    institution_id: number;  

    // @ManyToOne(() => Formulaire, Formulaire => Formulaire.courses , {nullable:true})
    // @ManyToOne(() => Formulaire, Formulaire => Formulaire.courses) 
    // formulaire: Formulaire;

    // @Column()
    // formulaire_id: number;

    @ManyToOne(() => Institution, (institution) => institution.courses, {nullable:true})
    institutions: Institution;
}
