import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NoteRepository } from './note.repository';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
  imports: [UserModule,PrismaModule]
})
export class NoteModule {}
