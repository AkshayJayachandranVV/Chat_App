import { IsNotEmpty , IsString,MinLength,Min,IsEmail} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}
