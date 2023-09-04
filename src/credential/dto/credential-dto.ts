import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsStrongPassword, IsUrl } from "class-validator"

export class CredentialDto{
  
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ example: "https://www.twitch.tv/", description: "url for credential" })
  url: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "twitch.tv", description: "title for credential" })
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "diego-beker", description: "username for credential" })
  username: string

  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  @ApiProperty({ example: "Driven@123", description: "strong password for credential" })
  password: string
}