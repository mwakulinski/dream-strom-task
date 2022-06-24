import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  height?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  mass?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  hair_color?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  skin_color?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  eye_color?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  birth_year?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  homeworld?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  films?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  species?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  vehicles?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  starships?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  created?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  edited?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  url?: string;
}
