import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUsers } from 'src/database/entities/users.entitiy';
import { Repository , Not } from 'typeorm';


@Injectable()
export class ChatService {


  constructor(@InjectRepository(ChatUsers)  private readonly  userRepository : Repository<ChatUsers>){}

  async getAllUsers(id:number) {
    try {
      console.log("enetered chat Users")

      const allUsers = await this.userRepository.find({
        where: {
          id: Not(Number(id)) 
        },select : ['username','id']
      });

      if(!allUsers){
        throw new NotFoundException('No Users')
      }

      return {success : true , result : allUsers}

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  findAll() {
    return `This action returns all chat`;
  }


  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
