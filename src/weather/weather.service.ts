import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { IWeather, IWeatherResponse } from '../interfaces/interfaces';
import { Repository } from 'typeorm';
import { Weather } from './entity/waether.entity';
import { Cron } from '@nestjs/schedule';
import { AppService } from '../app.service';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async getLastWeatherEntry() {
    return this.weatherRepository.query(
      'SELECT * FROM weather ORDER BY id DESC LIMIT 1',
    );
  }

  // @Cron('* * */1 * * *')
  // async saveWeatherData() {
  //   const weatherData = await this.getWeather('Warsaw', process.env.APPID);
  //   const filteredData = this.filterWeatherData(weatherData);
  //   await this.saveFilteredData(filteredData);
  //   this.logger.log('Weather data has been added to database');
  // }

  private async saveFilteredData(filteredData: IWeather) {
    this.weatherRepository.save(filteredData);
  }

  private async getWeather(q: string, APPID: string) {
    const { data }: { data: IWeatherResponse } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: { q, APPID },
      },
    );
    return data;
  }

  private filterWeatherData(dataToFilter: IWeatherResponse) {
    return {
      name: dataToFilter.name,
      temp: dataToFilter.main.temp,
      feels_like: dataToFilter.main.temp,
      temp_min: dataToFilter.main.temp_min,
      temp_max: dataToFilter.main.temp_max,
      pressure: dataToFilter.main.pressure,
      humidity: dataToFilter.main.humidity,
      sunrise: dataToFilter.sys.sunrise,
      sunset: dataToFilter.sys.sunset,
      visibility: dataToFilter.visibility,
      windSpeed: dataToFilter.wind.speed,
      windDeg: dataToFilter.wind.deg,
      description: dataToFilter.weather[0].description,
    } as IWeather;
  }
}
