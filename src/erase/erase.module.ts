import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';
import { CredentialModule } from 'src/credential/credential.module';
import { NoteModule } from 'src/note/note.module';
import { CardModule } from 'src/card/card.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [EraseController],
  providers: [EraseService],
  imports: [CredentialModule, NoteModule, CardModule, UserModule]
})
export class EraseModule {}
