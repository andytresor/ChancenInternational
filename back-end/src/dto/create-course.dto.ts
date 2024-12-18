import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsInt()
  readonly amount: number;

  @IsInt()
  readonly institution: number;  // Ajout de l'ID de l'institution

}
