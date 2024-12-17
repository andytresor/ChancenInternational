import { IsString, IsEmail, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateFormulaireDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly contact: string;

  @IsOptional() // Make it optional if it can be null
  @IsString()
  studentId?: number; // Add this line

  @IsString()
  readonly reason: string;  // Ajout de raison_de_la_demande

  @IsInt()
  readonly course_id: number;  // Ajout de course_id

  @IsInt()
  readonly institution_id: number;  // Ajout de institution_id
}
