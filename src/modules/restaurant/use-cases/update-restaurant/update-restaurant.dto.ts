import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantDto } from '../create-restaurant/create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
