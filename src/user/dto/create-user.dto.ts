import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"


export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
    password: string
}