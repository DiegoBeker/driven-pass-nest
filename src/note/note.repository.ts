import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NoteRepository {
  
  constructor(private readonly prisma: PrismaService) { }

  create(user: User, createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        ...createNoteDto,
        userId: user.id,
      }
    })
  }

  getNoteByUserAndTitle(userId: number, title: string) {
    return this.prisma.note.findUnique({
      where: {
        title_userId:{ title,userId }
      }
    })
  }

  findAll(user: User) {
    return this.prisma.note.findMany({
      where: {userId: user.id}
    })
  }
  
  findNoteById(id: number) {
    return this.prisma.note.findUnique({
      where: { id }
    })
  }
  
  remove(id: number) {
    return this.prisma.note.delete({
      where: { id }
    })
  }
  
}