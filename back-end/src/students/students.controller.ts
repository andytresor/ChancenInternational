import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express'; 

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    return this.studentsService.findOne(+id);
  }

  @Post()
    async createStudent(@Body() data: any, @Res() res: Response) {
        try {
            const student = await this.studentsService.createStudent(data);
            return res.status(HttpStatus.CREATED).json(student);
        } catch (error) {
            console.error('Error:', error.message);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
  @Put(':id')
    updateStudent(@Param('id') id: number, @Body() data: any) {
        return this.studentsService.updateStudent(id, data);
    }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<void> {
  //   return this.studentsService.delete(+id);
  // }

  // @Get('institution/:institutionId')
  // async findByInstitution(
  //   @Param('institutionId') institutionId: string,
  // ): Promise<Student[]> {
  //   return this.studentsService.findByInstitution(+institutionId);
  // }

  @Get('/students-with-funding')
async getStudentsWithFunding(): Promise<any[]> {
  return this.studentRepository.find({
    relations: ['funding'],
  });
}

}
