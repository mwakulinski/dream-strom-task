import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(providedPassword: string, storedPassword: string) {
    return bcrypt.compare(providedPassword, storedPassword);
  }
}
