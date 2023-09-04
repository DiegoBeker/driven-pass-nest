import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  
  @Post('sign-up')
  @ApiOperation({ summary: "Sign-up endpoint" })
  @ApiResponse({status: HttpStatus.CONFLICT})
  @ApiResponse({status: HttpStatus.BAD_REQUEST})
  signUp(@Body() createUserdto: CreateUserDto) {
    return this.authService.signUp(createUserdto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign-in endpoint" })
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto);
  }
}
