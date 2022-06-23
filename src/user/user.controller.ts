import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Post('/user')
  // async getOneUser(@Body('email') email: string) {
  //   return this.userService.findUserByEmail(email);
  // }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }
}
