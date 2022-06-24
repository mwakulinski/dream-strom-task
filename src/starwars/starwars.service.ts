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

  private filterCharacters(
    charactersToFilter: ICharacter[],
    filters: Partial<ICharacter>,
  ): ICharacter[] {
    return charactersToFilter.filter((character) => {
      return Object.keys(filters).every((key) => {
        if (Array.isArray(filters[key])) {
          return filters[key].every((filterValue) => {
            return character[key].some(
              (characterValue) => characterValue === filterValue,
            );
          });
        }
        return filters[key] === character[key];
      });
    });
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
