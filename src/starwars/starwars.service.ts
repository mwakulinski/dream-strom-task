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

  async getFilteredCharacters(
    body: Partial<ICharacter>,
    page: number = 1,
    charactersArray: ICharacter[] = [],
  ) {
    if (Object.keys(body).length === 0) {
      throw new HttpException('You must provide at least one query param', 400); //DOTO: change response
    }

    const data = await this.getFilteredPageOfData(
      body,
      this.getPageOfData,
      this.filterCharacters,
      page,
    );
    charactersArray.push(...data.results);
    if (data.next !== null) {
      page += 1;
      return this.getFilteredCharacters(body, page, charactersArray);
    }
    return charactersArray;
  }

  private async getFilteredPageOfData(
    filter: Partial<ICharacter>,
    getPageOfData: (urlParam: string, page: number) => Promise<IUserTypeAll>,
    filterData: (
      dataToFilter: ICharacter[],
      filter: Partial<ICharacter>,
    ) => ICharacter[],
    page: number = 1,
  ) {
    const pageOfData = await getPageOfData('people', page);
    pageOfData.results = filterData(pageOfData.results, filter);
    return pageOfData;
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
