import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateCardDto {
  
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  number: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  cvc: string

  @IsNotEmpty()
  @IsDate()
  expiration: Date

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsBoolean()
  isVirtual: boolean

  @IsNotEmpty()
  @IsString()
  type: string
}
