import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Plate } from '../../entities/plate.entity';
import { GetMenu } from '../get-menu/get-menu';
import { CreatePlateDto } from './create-plate.dto';

@Injectable()
export class CreatePlate {
  constructor(
    @InjectRepository(Plate)
    private readonly plateRepository: Repository<Plate>,
    private readonly getMenu: GetMenu,
  ) {}

  async execute(dto: CreatePlateDto, owner: User): Promise<Plate> {
    const menu = await this.getMenu.oneByOwner(owner, dto.menuId);
    if (!menu) {
      throw new NotFoundException({
        code: 'not_found_menu',
        detail: "The menu doesn't exist",
      });
    }
    delete dto.menuId;
    const plate = this.plateRepository.create(dto);
    plate.menu = menu;
    const plateStored = await this.plateRepository.save(plate);
    delete plateStored.menu;
    return plateStored;
  }
}
