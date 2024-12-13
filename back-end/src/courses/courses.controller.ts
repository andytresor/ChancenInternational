import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { courses } from './courses.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  async create(@Body() createCourseDto: CreateCourseDto): Promise<courses> {
    // console.log("ddddddddddd " , createCourseDto);
    
    // console.log("sfsfsgfsgf",await this.courseService.create(createCourseDto));
    return await this.courseService.create(createCourseDto);
    
  }

  @Get('all')
  async findAll(): Promise<courses[]> {
    return await this.courseService.findAll();
  }

  @Get('one/:id')
  async findOne(@Param('id') id: number): Promise<courses> {
    return await this.courseService.findOne(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<courses> {
    console.log(id, updateCourseDto);
    
    return await this.courseService.update(id, updateCourseDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.courseService.remove(id);
  }
}
