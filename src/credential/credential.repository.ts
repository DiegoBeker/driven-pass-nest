import { PrismaService } from "src/prisma/prisma.service";
import { CredentialDto } from "./dto/credential-dto";
import { Injectable } from "@nestjs/common";
import { Credential, User } from "@prisma/client";

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

  async findCredentialById(id: number){
    const credential = await this.prisma.credential.findUnique({
      where: { id }
    });

    const decrypted: Credential = {
      ...credential,
      password: this.cryptr.decrypt(credential.password)
    };

    return decrypted;
  }

  async findCredentialsByUser(user: User){
    const credentials: Credential[] = await this.prisma.credential.findMany({
      where: { userId: user.id }
    });

    const decrypted: Credential[] = credentials.map(c => ({...c, password: this.cryptr.decrypt(c.password)}));
    return decrypted;
  }

  delete(id: number) {
    return this.prisma.credential.delete({
        where: { id }
    });
  }

  eraseAllUserInfo(user: User) {
    return this.prisma.credential.deleteMany({
      where: { userId: user.id }
    })
  }
}