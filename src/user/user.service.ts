import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    if (await this.findUserByEmail(createUserDto.email)) {
      throw new HttpException('This email has already been used to login', 409);
    }
    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );
    const { password, ...emailAndId } = await this.userRepository.save(
      createUserDto,
    );
    return emailAndId;
  }

  private async validatePassword(
    providedPassword: string,
    storedPassword: string,
  ) {
    return this.authService.comparePasswords(providedPassword, storedPassword);
  }

  private async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
}
