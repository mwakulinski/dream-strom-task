import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IWeather } from '../../interfaces/interfaces';
@Entity('weather')
export class Weather implements IWeather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  temp: number;

  @Column()
  feels_like: number;

  @Column()
  temp_min: number;

  @Column()
  temp_max: number;

  @Column()
  pressure: number;

  @Column()
  humidity: number;

  @Column()
  sunrise: number;

  @Column()
  sunset: number;

  @Column()
  visibility: number;

  @Column()
  windSpeed: number;

  @Column()
  windDeg: number;

  @Column()
  description: string;
}
