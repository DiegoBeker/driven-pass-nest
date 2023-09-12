import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseDto } from './dto/erase.dto';
import { CredentialService } from '../credential/credential.service';
import { NoteService } from '../note/note.service';
import { CardService } from '../card/card.service';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EraseService {
  constructor(
    private readonly credentialService: CredentialService,
    private readonly noteService: NoteService,
    private readonly cardService: CardService,
    private readonly userService: UserService,
  ) {}

  async eraseAllUserInfo(user: User, eraseDto: EraseDto) {
    const { password } = eraseDto;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Password not valid.');

    await this.credentialService.eraseAllUserInfo(user);
    await this.noteService.eraseAllUserInfo(user);
    await this.cardService.eraseAllUserInfo(user);
    return await this.userService.remove(user);
  }
}
