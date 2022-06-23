import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { IWeather, IWeatherResponse } from '../interfaces/interfaces';
import { FilteredWeatherData } from '../types/types';
import { Repository } from 'typeorm';
import { Weather } from './entity/waether.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  async saveFilteredData(
    dataToFilter: IWeatherResponse,
    filteringMethod: (dataToFilter: IWeatherResponse) => FilteredWeatherData,
  ) {
    const filteredData = filteringMethod(dataToFilter);
    this.weatherRepository.save(filteredData);
  }

  async getWeather(q: string, APPID: string) {
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
