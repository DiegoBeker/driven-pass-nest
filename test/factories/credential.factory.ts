import { PrismaService } from "../../src/prisma/prisma.service";

export class CredentialFactory{
  private url: string;
  private title: string;
  private username: string;
  private password: string;
  private userId: number;

  constructor(private readonly prisma: PrismaService) { }
  
  withUrl(url: string) {
    this.url = url;
    return this;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withUsername(username: string) {
    this.username = username;
    return this;
  }

  withPassword(password: string) {
    this.password = password;
    return this;
  }

  withUserId(userId: number) {
    this.userId = userId
    return this;
  }

  build() {
    return {
      url: this.url,
      title: this.title,
      username: this.username,
      password: this.password,
      userId: this.userId
    }
  }

  async persist() {
    const credential = this.build();
    return await this.prisma.credential.create({
      data: credential
    })
  }
}