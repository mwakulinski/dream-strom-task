import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces/interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: IUser) {
    return this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(providedPassword: string, storedPassword: string) {
    return bcrypt.compare(providedPassword, storedPassword);
  }
}
