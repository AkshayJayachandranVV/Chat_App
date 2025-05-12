import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('chatUsers/:id')
  create(@Param('id') id: string) {
    return this.chatService.getAllUsers(+id); 
  }
  
}
