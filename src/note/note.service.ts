import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from '@prisma/client';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {

  constructor(private readonly noteRepository: NoteRepository) {}

  async create(user: User , createNoteDto: CreateNoteDto) {
    const titleExists = await this.noteRepository.getNoteByUserAndTitle(user.id, createNoteDto.title);
    if (titleExists) throw new ConflictException("User already uses this title");
    
    return await this.noteRepository.create(user, createNoteDto);
  }

  async findAll(user: User) {
    return await this.noteRepository.findAll(user);
  }

  async findOne(user: User, id: number) {
    if(isNaN(id) || id < 0) throw new BadRequestException('Invalid ID');
    
    const note = await this.noteRepository.findNoteById(id);
    if(!note) throw new NotFoundException();
    
    if(note.userId !== user.id) throw new ForbiddenException();

    return note;
  }


  async remove(user: User,id: number) {
    if(isNaN(id) || id < 0) throw new BadRequestException('Invalid ID');
    
    const note = await this.noteRepository.findNoteById(id);
    if(!note) throw new NotFoundException();

    if(note.userId !== user.id) throw new ForbiddenException();

    return this.noteRepository.remove(id);
  }

  async eraseAllUserInfo(user: User) {
    return this.noteRepository.eraseAllUserInfo(user);
  }
}
