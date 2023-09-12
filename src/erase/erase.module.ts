import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';
import { CredentialModule } from '../credential/credential.module';
import { NoteModule } from '../note/note.module';
import { CardModule } from '../card/card.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [EraseController],
  providers: [EraseService],
  imports: [CredentialModule, NoteModule, CardModule, UserModule],
})
export class EraseModule {}
