import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IWeatherResponse } from 'src/interfaces/interfaces';

@Injectable()
export class WeatherService {
  async getWeather(q: string, APPID: string) {
    const { data }: { data: IWeatherResponse } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: { q, APPID },
      },
    );
    return data;
  }
}
