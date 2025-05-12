import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUsers } from 'src/database/entities/users.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([ChatUsers])],
  controllers: [ChatController],
  providers: [ChatService],
  exports : [ChatModule]
})
export class ChatModule {}
