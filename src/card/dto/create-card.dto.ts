import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'title', description: 'title for card' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '4309033090908822', description: 'number for card' })
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'DIEGO REIS', description: 'name for card' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '111', description: 'cvc for card' })
  cvc: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ example: '03/2025', description: 'expiration for card' })
  expiration: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1234', description: 'password for card' })
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'isVirtual for card' })
  isVirtual: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'CREDIT', description: 'type for card' })
  type: string;
}
