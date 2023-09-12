import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { User } from '@prisma/client';
import { CardRepository } from './card.repository';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async create(user: User, createCardDto: CreateCardDto) {
    const titleExists = await this.cardRepository.getCardByUserAndTitle(
      user.id,
      createCardDto.title,
    );
    if (titleExists)
      throw new ConflictException('User already uses this title');

    return await this.cardRepository.create(user, createCardDto);
  }

  async findAll(user: User) {
    return await this.cardRepository.findAll(user);
  }

  async findOne(user: User, id: number) {
    if (isNaN(id) || id < 0) throw new BadRequestException('Invalid ID');

    const note = await this.cardRepository.findCardById(id);
    if (!note) throw new NotFoundException();

    if (note.userId !== user.id) throw new ForbiddenException();

    return note;
  }

  async remove(user: User, id: number) {
    if (isNaN(id) || id < 0) throw new BadRequestException('Invalid ID');

    const card = await this.cardRepository.findCardById(id);
    if (!card) throw new NotFoundException();

    if (card.userId !== user.id) throw new ForbiddenException();

    return this.cardRepository.remove(id);
  }

  async eraseAllUserInfo(user: User) {
    return this.cardRepository.eraseAllUserInfo(user);
  }
}
