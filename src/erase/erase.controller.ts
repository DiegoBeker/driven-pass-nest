import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { EraseDto } from './dto/erase.dto';
import { EraseService } from './erase.service';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  
  constructor(private readonly eraseService: EraseService) { }

  @Delete()
  eraseAllUserInfo(@Body() eraseDto: EraseDto, @User() user: UserPrisma){
    return this.eraseService.eraseAllUserInfo(user, eraseDto);
  }
}
