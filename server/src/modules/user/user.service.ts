import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChatUsers } from 'src/database/entities/users.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(ChatUsers) private readonly usersRepository : Repository<ChatUsers>
  ){}


  async create(createUserDto: CreateUserDto) {
     try {
       console.log("enetered",createUserDto)

       const User = await this.usersRepository.findOne({where : {email : createUserDto.email}})

       console.log(User)

       if(User){
        throw new ConflictException("Email already exist")
       }

       const hashedPassword = await bcrypt.hash(createUserDto.password,10)



       const newUser = await this.usersRepository.create({
        ...createUserDto, // ✅ this is the actual user data
        password: hashedPassword,
        created_at: new Date().toISOString(),
      });
       
       const result = await this.usersRepository.save(newUser)

       return {success : true , id : result.id }

     } catch (error) {
        console.log(error)
        throw error
     }
  }

  async login(loginUserDto : LoginUserDto) {
    try {
      console.log("enetered to the login")

      const {email,password} = loginUserDto

      const user = await this.usersRepository.findOne({ where : { email :email}})

      if(!user){
        throw new NotFoundException('Invalid cridentials')
      }


      const isPasswordValid = await bcrypt.compare(password,user.password)

      if(isPasswordValid){
          throw new UnauthorizedException('Invalid cridential')
      }


      return {
        success: true,
        message: 'Login successsuccessfully addedful',
        id : user.id
      };

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
