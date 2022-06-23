import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/get')
  async getLastWeatherEntry() {
    return this.weatherService.getLastWeatherEntry();
  }
}
