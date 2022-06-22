import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarwarsModule } from './starwars/starwars.module';

@Module({
  imports: [StarwarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
