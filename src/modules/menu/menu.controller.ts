import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReqUser } from '../auth/decorators/req-user.decorator';
import { JwtStrategyGuard } from '../auth/guards/jwt-strategy.guard';
import { CreateRestaurantDto } from '../restaurant/use-cases/create-restaurant/create-restaurant.dto';
import { User } from '../user/entities/user.entity';
import { Menu } from './entities/menu.entity';
import { Plate } from './entities/plate.entity';
import { CreateMenu } from './use-cases/create-menu/create-menu';
import { CreateMenuDto } from './use-cases/create-menu/create-menu.dto';
import { CreatePlate } from './use-cases/create-plate/create-plate';
import { CreatePlateDto } from './use-cases/create-plate/create-plate.dto';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly createMenu: CreateMenu,
    private readonly createPlate: CreatePlate,
  ) {}

  @UseGuards(JwtStrategyGuard)
  @Post()
  async executeCreateRestaurant(
    @ReqUser() owner: User,
    @Body() dto: CreateMenuDto,
  ) {
    return await this.createMenu.execute(dto, owner);
  }

  @UseGuards(JwtStrategyGuard)
  @Post('plate')
  async executeCreatePlate(
    @ReqUser() owner: User,
    @Body() dto: CreatePlateDto,
  ): Promise<Plate> {
    return await this.createPlate.execute(dto, owner);
  }
}
