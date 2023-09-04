import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NoteRepository } from './note.repository';
import { CredentialService } from 'src/credential/credential.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
  imports: [UserModule,PrismaModule],
  exports: [NoteService]
})
export class NoteModule {}
