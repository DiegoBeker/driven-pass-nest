import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CredentialModule } from './credential/credential.module';
import { NoteModule } from './note/note.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CredentialModule, NoteModule, CardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
