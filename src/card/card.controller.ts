import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cards')
@UseGuards(AuthGuard)
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post a new card' })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  create(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
    return this.cardService.create(user, createCardDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get cards from user' })
  findAll(@User() user: UserPrisma) {
    return this.cardService.findAll(user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get specific card' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardService.findOne(user, +id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete specific card' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardService.remove(user, +id);
  }
}
