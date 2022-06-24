import { Module } from '@nestjs/common';
import { StarwarsController } from './starwars.controller';
import { StarwarsService } from './starwars.service';

@Module({
  controllers: [StarwarsController],
  providers: [StarwarsService],
})
export class StarwarsModule {}
