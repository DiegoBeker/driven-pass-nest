import { Module } from '@nestjs/common';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { CredentialRepository } from './credential.repository';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [CredentialController],
  providers: [CredentialService, CredentialRepository],
  exports: [CredentialService]
})
export class CredentialModule {}
