import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column({ type: 'simple-array' })
  schedule: [Date, Date];

  @Column()
  cellphone: number;

  @Column()
  profilePhoto: string;

  @Column()
  bannerPhoto: string;

  @Column()
  isDelivery: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @ManyToMany(() => Review)
  @JoinTable()
  reviews: Review[];
}