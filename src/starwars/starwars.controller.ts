import { Controller, Get } from '@nestjs/common';
import { StarwarsService } from './starwars.service';

@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwatsService: StarwarsService) {}
  @Get()
  async getAllPeople() {
    return this.starwatsService.getAllPeople();
  }
}
