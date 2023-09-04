import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notes')
@UseGuards(AuthGuard)
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Post a new note" })
  @ApiResponse({status: HttpStatus.CONFLICT})
  @ApiResponse({status: HttpStatus.BAD_REQUEST})
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    return this.noteService.create(user, createNoteDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get notes from user" })
  findAll(@User() user: UserPrisma) {
    return this.noteService.findAll(user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get specific note" })
  @ApiResponse({status: HttpStatus.FORBIDDEN})
  @ApiResponse({status: HttpStatus.NOT_FOUND})
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.noteService.findOne(user, +id);
  }
  
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete specific credential" })
  @ApiResponse({status: HttpStatus.FORBIDDEN})
  @ApiResponse({status: HttpStatus.NOT_FOUND})
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.noteService.remove(user, +id);
  }
}
