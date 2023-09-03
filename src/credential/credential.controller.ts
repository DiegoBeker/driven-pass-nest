import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CredentialDto } from './dto/credential-dto';
import { CredentialService } from './credential.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) { }

  @Post()
  create(@Body() credentialDto: CredentialDto, @User() user: UserPrisma) {
    return this.credentialService.create(user, credentialDto);
  }

  @Get()
  getCredentialsByUser(@User() user: UserPrisma){
    return this.credentialService.findCredentialsByUser(user);
  }

  @Get('/:credentialId')
  getCredentialById(@Param('credentialId') credentialId: string, @User() user: UserPrisma){
    return this.credentialService.findCredentialById(user, parseInt(credentialId));
  }
}
