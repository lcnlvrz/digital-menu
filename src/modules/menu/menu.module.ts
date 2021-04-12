import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { Menu } from './entities/menu.entity';
import { Plate } from './entities/plate.entity';
import { MenuController } from './menu.controller';
import { CreateMenu } from './use-cases/create-menu/create-menu';
import { CreatePlate } from './use-cases/create-plate/create-plate';
import { GetMenu } from './use-cases/get-menu/get-menu';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Plate]), RestaurantModule],
  providers: [CreateMenu, CreatePlate, GetMenu],
  controllers: [MenuController],
})
export class MenuModule {}
