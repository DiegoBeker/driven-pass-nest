import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findCredentialsByUser(user: User){
    return this.credentialRepository.findCredentialsByUser(user);
  }

  async findCredentialById(user: User, id: number) {

    if(isNaN(id) || id < 0) throw new BadRequestException('Invalid ID');
    
    const credential = await this.credentialRepository.findCredentialById(id);
    if(!credential) throw new NotFoundException();
    
    if(credential.userId !== user.id) throw new ForbiddenException();

    return credential;
  }

  async delete(user: User, id: number) {
    if(isNaN(id) || id < 0) throw new BadRequestException('Invalid ID');
    
    const credential = await this.credentialRepository.findCredentialById(id);
    if(!credential) throw new NotFoundException();

    if(credential.userId !== user.id) throw new ForbiddenException();

    return this.credentialRepository.delete(id);
  }

  async eraseAllUserInfo(user: User){
    return this.credentialRepository.eraseAllUserInfo(user);
  }
}
