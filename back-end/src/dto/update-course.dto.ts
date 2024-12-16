import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsInt()
  @IsOptional()
  readonly amount?: number;

  @IsInt()
  @IsOptional()
  readonly institution_id?: number;  // Ajout de l'ID de l'institution
}
