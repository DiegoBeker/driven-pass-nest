import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createUserdto: CreateUserDto) {
    return this.authService.signUp(createUserdto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto);
  }
}
