import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ICharacter, IUserTypeAll } from '../interfaces/interfaces';

@Injectable()
export class StarwarsService {
  async getAllPeople(
    page: number = 1,
    charactersArray: ICharacter[] = [],
  ): Promise<ICharacter[]> {
    const data = await this.getPageOfData('people', page);
    charactersArray.push(...data.results);
    if (data.next !== null) {
      page += 1;
      return this.getAllPeople(page, charactersArray);
    }
    return charactersArray;
  }

  async getFilteredData(queryParams: Partial<ICharacter>) {
    if (Object.keys(queryParams).length === 0) {
      throw new HttpException('You must provide at least one query param', 400); //DOTO: change response
    }
  }

  private async getPageOfData(
    urlParam: string,
    page: number,
  ): Promise<IUserTypeAll> {
    try {
      const { data }: { data: IUserTypeAll } = await axios.get(
        `https://swapi.dev/api/${urlParam}`,
        { params: { page: page } },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
