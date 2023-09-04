import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"


export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: "diego@email.com", description: "email for user" })
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
    @ApiProperty({ example: "Driven@123", description: "strong password for user" })
    password: string
}