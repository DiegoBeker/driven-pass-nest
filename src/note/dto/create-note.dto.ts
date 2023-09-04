import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "title", description: "title for note" })
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "This is my safe note", description: "text for note" })
  text: string
}

