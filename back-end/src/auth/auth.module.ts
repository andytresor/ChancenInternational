import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Token } from './token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]), // Register User entity
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use environment variables in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, TypeOrmModule], // Export AuthService if needed in other modules
})
export class AuthModule {}