import { IsNotEmpty, IsString, IsStrongPassword, IsUrl } from "class-validator"

export class CredentialDto{
  
  @IsUrl()
  @IsNotEmpty()
  url: string

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  username: string

  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string
}