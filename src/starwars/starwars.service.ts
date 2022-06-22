import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StarwarsService {
  async getAllPeople() {
    try {
      const { data } = await axios.get('https://swapi.dev/api/people');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
