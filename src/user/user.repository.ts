import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserRepository{
    
    private SALT = 10;
    constructor(private readonly prisma: PrismaService) { }
    
    create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...createUserDto,
                password: bcrypt.hashSync(createUserDto.password, this.SALT)
            }
        })
    }

    getUserByEmail(email: string) {
      return this.prisma.user.findUnique({
        where: { email }
      })
    }

    getUserById(id: number) {
      return this.prisma.user.findUnique({
        where: { id }
      })
    }

    remove(id: number) {
      return this.prisma.user.delete({
        where: { id }
      })
    }
}