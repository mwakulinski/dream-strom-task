import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFilterDto } from './dto/filters.dto';
import { StarwarsService } from './starwars.service';

@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwarsService: StarwarsService) {}
  @Get()
  async getAllPeople() {
    return this.starwarsService.getAllPeople();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/getfiltered')
  async getFilteredCharacters(@Body() filters: CreateFilterDto) {
    return this.starwarsService.getFilteredCharacters(filters);
  }
}
