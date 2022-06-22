import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IUserTypeAll } from '../interfaces/interfaces';

@Injectable()
export class StarwarsService {
  async getAllPeople() {
    try {
      const { data }: { data: IUserTypeAll } = await axios.get(
        'https://swapi.dev/api/people',
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
