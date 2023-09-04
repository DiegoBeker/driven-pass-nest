import { Body, Controller, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { EraseDto } from './dto/erase.dto';
import { EraseService } from './erase.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Erase')
@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  
  constructor(private readonly eraseService: EraseService) { }
  
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete ALL user info" })
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  eraseAllUserInfo(@Body() eraseDto: EraseDto, @User() user: UserPrisma){
    return this.eraseService.eraseAllUserInfo(user, eraseDto);
  }
}
