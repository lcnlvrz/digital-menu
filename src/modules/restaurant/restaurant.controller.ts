import { Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ReqUser } from '../auth/decorators/req-user.decorator';
import { JwtStrategyGuard } from '../auth/guards/jwt-strategy.guard';
import { User } from '../user/entities/user.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { CreateRestaurantDto } from './use-cases/create-restaurant/create-restaurant.dto';
import { UpdateRestaurant } from './use-cases/update-restaurant/update-restaurant';
import { UpdateRestaurantDto } from './use-cases/update-restaurant/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly createRestaurant: CreateRestaurant,
    private readonly updateRestaurant: UpdateRestaurant,
  ) {}

  @UseGuards(JwtStrategyGuard)
  @Post()
  async executeCreateRestaurant(
    dto: CreateRestaurantDto,
    @ReqUser() owner: User,
  ) {
    return await this.createRestaurant.execute(dto, owner);
  }

  @UseGuards(JwtStrategyGuard)
  @Put()
  async executeUpdateRestaurant(
    dto: UpdateRestaurantDto,
    @ReqUser() owner: User,
  ): Promise<Restaurant> {
    return await this.updateRestaurant.execute(dto, owner);
  }
}
