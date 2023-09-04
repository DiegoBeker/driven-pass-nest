import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    return this.noteService.create(user, createNoteDto);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    return this.noteService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.noteService.findOne(user, +id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.noteService.remove(user, +id);
  }
}
