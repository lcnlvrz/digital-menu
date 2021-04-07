import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Review } from './entities/review.entity';
import { RestaurantController } from './restaurant.controller';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { GetRestaurant } from './use-cases/get-restaurant/get-restaurant';
import { UpdateRestaurant } from './use-cases/update-restaurant/update-restaurant';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Review])],
  controllers: [RestaurantController],
  providers: [CreateRestaurant, GetRestaurant, UpdateRestaurant],
})
export class RestaurantModule {}
