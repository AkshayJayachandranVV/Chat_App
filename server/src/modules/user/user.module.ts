import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUsers } from 'src/database/entities/users.entitiy';
@Module({
  imports : [TypeOrmModule.forFeature([ChatUsers])],
  exports : [UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
