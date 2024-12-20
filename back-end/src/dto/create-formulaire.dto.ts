import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreateFormulaireDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly contact: string;

  @IsString()
  readonly reason: string;  // No change here, but could add additional validation if needed

  @IsInt()
  readonly course_id: number;  // Links to Course entity (course ID)

  @IsInt()
  readonly institution_id: number;  // Links to Institution entity (institution ID)
}
