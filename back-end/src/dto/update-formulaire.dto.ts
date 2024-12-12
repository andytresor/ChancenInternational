import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class UpdateFormulaireDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly contact?: string;

  @IsString()
  @IsOptional()
  readonly raison_de_la_demande?: string;  // Ajout de raison_de_la_demande

  @IsInt()
  @IsOptional()
  readonly course_id?: number;  // Ajout de course_id

  @IsInt()
  @IsOptional()
  readonly institution_id?: number;  // Ajout de institution_id
}
