import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDate({ each: true })
  schedule: [Date, Date];

  @IsNotEmpty()
  @IsPhoneNumber('AR')
  cellphone: number;

  @IsString()
  @IsNotEmpty()
  bannerPhoto: string;

  @IsBoolean()
  isDelivery: boolean;
}
