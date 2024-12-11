import { Controller, Post, Body, Req, Get, ParseIntPipe, Param, Res, HttpStatus, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() { name, email, password }: { name: string; email: string; password: string }) {
    return this.authService.register(name, email, password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('one/:id')
  async getUserByID(@Param('id', ParseIntPipe) userId: number): Promise<Partial<User>> {
    return this.authService.getUserInfo(userId);
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard) // Ensure the route is protected by JwtAuthGuard
  async getMe(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };
  }


  @Post('logout')
  async logout(@Req() req, @Res() res) {
    const refreshToken = req.body.refreshToken; // Assumes refresh token is sent in the body
    if (refreshToken) {
      // Implement token removal logic, e.g., remove from database
      await this.authService.revokeRefreshToken(refreshToken);
    }

    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }

}