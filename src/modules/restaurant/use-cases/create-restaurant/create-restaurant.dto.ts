import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsLocale,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DaysOfTheWeek } from '../../days.week';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsArray()
  @IsString({ each: true })
  scheduleHour: string[];

  @IsArray()
  @IsEnum(DaysOfTheWeek, { each: true })
  scheduleDays: DaysOfTheWeek[];

  @IsNumber()
  @IsPositive()
  cellphone: number;

  @IsString()
  @IsUrl()
  @IsOptional()
  bannerPhoto: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  profilePhoto: string;

  @IsBoolean()
  isDelivery: boolean;
}
