import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pamelajo25',
      database: 'chancen_finances',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Only for development; disable in production
    }),
    AuthModule, // Import AuthModule
  ],
})
export class AppModule {}
