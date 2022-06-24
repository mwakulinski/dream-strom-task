import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ICharacter, IUserTypeAll } from '../interfaces/interfaces';
import { CreateFilterDto } from './dto/filters.dto';
import { StarwarsService } from './starwars.service';

@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwarsService: StarwarsService) {}
  @Get()
  async getAllPeople() {
    return this.starwarsService.getAllPeople();
  }

  @Post('/getfiltered')
  async getFilteredCharacters(@Body() filters: CreateFilterDto) {
    return this.starwarsService.getFilteredCharacters(filters);
  }
}
