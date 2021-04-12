import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class Plate {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'simple-array' })
  ingredients: string[];

  @Column()
  price: number;

  @Column({ type: 'simple-array' })
  preparationTime: string[];

  @Column()
  image: string;

  @ManyToOne(() => Menu, (menu) => menu.plates)
  menu: Menu;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
