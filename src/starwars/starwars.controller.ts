import { Controller, Get, Query } from '@nestjs/common';
import { ICharacter, IUserTypeAll } from '../interfaces/interfaces';
import { StarwarsService } from './starwars.service';

@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwatsService: StarwarsService) {}
  @Get()
  async getAllPeople() {
    return this.starwatsService.getAllPeople();
  }

  @Get('/getfiltered')
  async getFilteredPeople(@Query() queryParams: Partial<ICharacter>) {
    return this.starwatsService.getFilteredData(queryParams);
  }
}
