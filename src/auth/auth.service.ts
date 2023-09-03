import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    
    private EXPIRATION_TIME = "7 days";
    private ISSUER = "DrivenPass";
    private AUDIENCE = "users";
    
    constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService) { }
        
    async signUp(createUserDto: CreateUserDto) {
      return await this.userService.create(createUserDto);
    }
        
    async signIn(signInDto: CreateUserDto) {
      const { email, password } = signInDto;
      const user = await this.userService.getUserByEmail(email);
      if (!user) throw new UnauthorizedException("Email or password not valid.");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new UnauthorizedException("Email or password not valid.");

      return this.createToken(user);
    }

    createToken(user: User) {
        const { id, email } = user;
        
        const token = this.jwtService.sign({ email }, { 
          expiresIn: this.EXPIRATION_TIME, 
          subject: String(id), 
          issuer: this.ISSUER, 
          audience: this.AUDIENCE
        })
    
        return { token };
      }
}
