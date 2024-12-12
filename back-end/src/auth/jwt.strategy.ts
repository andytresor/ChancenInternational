import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey', // Use environment variable in production
    });
  }

 async validate(payload: { email: string; role: string; name: string }) {
  // No database lookup needed if details are in the payload.
  return { email: payload.email, name: payload.name, role: payload.role };
}

}
