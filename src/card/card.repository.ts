import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { User } from '@prisma/client';

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, createCardDto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        ...createCardDto,
        userId: user.id,
      },
    });
  }

  getCardByUserAndTitle(userId: number, title: string) {
    return this.prisma.card.findUnique({
      where: { title_userId: { title, userId } },
    });
  }

  findAll(user: User) {
    return this.prisma.card.findMany({
      where: { userId: user.id },
    });
  }

  findCardById(id: number) {
    return this.prisma.card.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.card.delete({
      where: { id },
    });
  }

  eraseAllUserInfo(user: User) {
    return this.prisma.card.deleteMany({
      where: { userId: user.id },
    });
  }
}
