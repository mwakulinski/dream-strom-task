import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { IWeather, IWeatherResponse } from 'src/interfaces/interfaces';
import { Repository } from 'typeorm';
import { Weather } from './entity/waether.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}
  async getWeather(q: string, APPID: string) {
    const { data }: { data: IWeatherResponse } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: { q, APPID },
      },
    );
    return this.filterWeatherData(data);
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
