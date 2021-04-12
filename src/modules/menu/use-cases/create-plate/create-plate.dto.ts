import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  isPositive,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreatePlateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  preparationTime: string[];

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  menuId: number;
}
