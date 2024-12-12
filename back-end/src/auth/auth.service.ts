import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Token } from './token.entity';
import { Student } from 'src/students/student.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ accessToken: string; role: string ; user: { id: number; name: string; email: string; role: string; students:Student[] }}> {
  const user = await this.userRepository.findOne({
     where: { email } ,
     relations:['students']
    });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { email: user.email, role: user.role }; // Include role in JWT payload
  const accessToken = this.jwtService.sign(payload);

  return {
    accessToken,
    role: user.role, // Include role in response
     user: { id: user.id, name: user.name, email: user.email, role: user.role,students: user.student}
  };
}


  async validateUser(userId: number): Promise<User> {
    console.log(await this.userRepository.findOneBy({ id: userId }));
    return this.userRepository.findOneBy({ id: userId });
  }

  async getAllUsers(): Promise<User[]> {
    console.log(await this.userRepository.find());
    return this.userRepository.find(); // Fetch all users
  }

  async getUserInfo(userId: number): Promise<Partial<User>> {
    const user = await this.validateUser(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, ...userInfo } = user;
    return userInfo;
  }

  async revokeRefreshToken(refreshToken: string) {
    // Example: Update the refresh token record in your database
    await this.tokenRepository.update({ token: refreshToken }, { isRevoked: true });
  }
}

export default AuthService;
