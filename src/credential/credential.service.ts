import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CredentialDto } from './dto/credential-dto';
import { CredentialRepository } from './credential.repository';

@Injectable()
export class CredentialService {
  
  constructor(private readonly credentialRepository: CredentialRepository) { }
    
  async create(user: User, credentialDto: CredentialDto) {
    
    const titleExists = await this.credentialRepository.getCredentialByUserAndTitle(user.id, credentialDto.title);
    if (titleExists) throw new ConflictException("User already uses this title");

    
    return this.credentialRepository.create(user.id, credentialDto);
  }
}
