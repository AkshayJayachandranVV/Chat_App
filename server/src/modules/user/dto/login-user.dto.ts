import { IsString , IsNotEmpty , MinLength , IsEmail } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty()
    email : string


    @IsNotEmpty()
    @MinLength(4)
    password: string;

}