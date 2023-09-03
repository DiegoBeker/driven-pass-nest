import { PrismaService } from "src/prisma/prisma.service";
import { CredentialDto } from "./dto/credential-dto";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class CredentialRepository {
  
    private Cryptr = require('cryptr');
    private cryptr = new this.Cryptr('myTotallySecretKey');

  constructor(private readonly prisma: PrismaService) { }  

  getCredentialByUserAndTitle( userId: number, title: string,){

    return this.prisma.credential.findUnique({
        where: { title_userId: {title, userId}}
    });
  }

  create(userId: number, credentialDto: CredentialDto){
    return this.prisma.credential.create({
        data: {
            ...credentialDto,
            password: this.cryptr.encrypt(credentialDto.password),
            userId
        }
    });
  }

  findCredentialById(id: number){
    return this.prisma.credential.findUnique({
        where: { id }
    });
  }

  findCredentialsByUser(user: User){
    return this.prisma.credential.findMany({
        where: { userId: user.id }
    });
  }
}