import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CredentialDto } from './dto/credential-dto';
import { CredentialService } from './credential.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Credentials')
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Post a new credential" })
  @ApiResponse({status: HttpStatus.CONFLICT})
  @ApiResponse({status: HttpStatus.BAD_REQUEST})
  create(@Body() credentialDto: CredentialDto, @User() user: UserPrisma) {
    return this.credentialService.create(user, credentialDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get credentials from user" })
  getCredentialsByUser(@User() user: UserPrisma){
    return this.credentialService.findCredentialsByUser(user);
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get specific credential" })
  @ApiResponse({status: HttpStatus.FORBIDDEN})
  @ApiResponse({status: HttpStatus.NOT_FOUND})
  getCredentialById(@Param('id') id: string, @User() user: UserPrisma){
    return this.credentialService.findCredentialById(user, parseInt(id));
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete specific credential" })
  @ApiResponse({status: HttpStatus.FORBIDDEN})
  @ApiResponse({status: HttpStatus.NOT_FOUND})
  delete(@Param('id') id: string, @User() user: UserPrisma){
    return this.credentialService.delete(user, parseInt(id))
  }
}
