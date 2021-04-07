import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUser } from './use-cases/create-user';
import { FindUser } from './use-cases/find-user/find-user';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUser, FindUser],
  exports: [CreateUser, FindUser],
})
export class UserModule {}
