import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ICharacter, IUserTypeAll } from '../interfaces/interfaces';
import { CreateFilterDto } from './dto/filters.dto';

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
    filters: CreateFilterDto,
    page: number = 1,
    charactersArray: ICharacter[] = [],
  ) {
    if (Object.keys(filters).length === 0) {
      throw new HttpException('You must provide at least one query param', 400); //DOTO: change response
    }

    const data = await this.getFilteredPageOfData(
      filters,
      this.getPageOfData,
      this.filterCharacters,
      page,
    );
    charactersArray.push(...data.results);
    if (data.next !== null) {
      page += 1;
      return this.getFilteredCharacters(filters, page, charactersArray);
    }
    return charactersArray;
  }

  private async getFilteredPageOfData(
    filter: CreateFilterDto,
    getPageOfData: (urlParam: string, page: number) => Promise<IUserTypeAll>,
    filterData: (
      dataToFilter: ICharacter[],
      filter: CreateFilterDto,
    ) => ICharacter[],
    page: number = 1,
  ) {
    const pageOfData = await getPageOfData('people', page);
    pageOfData.results = filterData(pageOfData.results, filter);
    return pageOfData;
  }

  private filterCharacters(
    charactersToFilter: ICharacter[],
    filters: CreateFilterDto,
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
