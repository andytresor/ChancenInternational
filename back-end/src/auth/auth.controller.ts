import { Controller, Post, Body, ParseIntPipe, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.authService.register(name, email, password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
  
  @Get('check-email/:email')
  async isEmailTaken(@Param('email') email: string): Promise<boolean> {
    return this.authService.isEmailTaken(email);
  }
  @Get('one/:id') 
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<Partial<User>> {
    return this.authService.getUserInfo(userId);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: { userId: number }) {
    return this.authService.refreshToken(refreshTokenDto.userId);
  }
  
}
