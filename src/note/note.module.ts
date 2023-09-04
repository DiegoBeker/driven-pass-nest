import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NoteRepository } from './note.repository';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
  imports: [UserModule,PrismaModule],
  exports: [NoteService]
})
export class NoteModule {}
