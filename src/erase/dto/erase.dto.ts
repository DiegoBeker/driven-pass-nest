import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EraseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Driven@123',
    description: 'strong password for user',
  })
  password: string;
}
