import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { UserModule } from 'src/user/user.module';
import { CardRepository } from './card.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CardController],
  providers: [CardService,CardRepository],
  imports:[UserModule,PrismaModule],
  exports: [CardService]
})
export class CardModule {}
