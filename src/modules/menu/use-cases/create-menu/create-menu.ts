import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetRestaurant } from 'src/modules/restaurant/use-cases/get-restaurant/get-restaurant';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Menu } from '../../entities/menu.entity';
import { CreateMenuDto } from './create-menu.dto';

@Injectable()
export class CreateMenu {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly getRestaurant: GetRestaurant,
  ) {}

  async execute(dto: CreateMenuDto, owner: User): Promise<Menu> {
    const restaurant = await this.getRestaurant.byOwner(owner);
    const menu = this.menuRepository.create(dto);
    menu.restaurant = restaurant;
    const menuStored = await this.menuRepository.save(menu);
    delete menuStored.restaurant;
    return menuStored;
  }
}
