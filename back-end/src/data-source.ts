import { DataSource } from 'typeorm';
import { courses } from './courses/courses.entity';
import { Formulaire } from '../src/formulaire/formulaire.entity';
import { Institution } from './institutions/institution.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [courses, Formulaire, Institution],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
});
