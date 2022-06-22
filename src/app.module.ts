import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarwarsModule } from './starwars/starwars.module';
import { DatabaseModule } from './database/database.module';
import { typeormConfig } from '../ormconfig';

@Module({
  imports: [
    StarwarsModule,
    TypeOrmModule.forRoot(typeormConfig),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
