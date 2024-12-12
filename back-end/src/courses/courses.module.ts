import { Module } from '@nestjs/common';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/institutions/institution.entity';
import { courses } from './courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([courses, Institution])],
  exports: [TypeOrmModule],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CoursesModule {}
