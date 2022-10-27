import { User } from '../auth/user.entity';
import { GetBuyersFilterDTO } from './dto/get-buyer.dto';
import { CreateBuyerDTO } from './dto/create-buyer.dto';
import { BuyersService } from './buyer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Buyer } from './buyer.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import {PageOptionsDto} from "../shared/dtos";
import {PageDto} from "../shared/dtos/page.dto";
import { IPostResponse } from 'src/shared/common.class';

@Controller('buyers')
@UseGuards(AuthGuard())
export class BuyersController {
  constructor(private buyersService: BuyersService) {}

  @Get()
  getAllBuyers(
    @Query(ValidationPipe) filterDTO: GetBuyersFilterDTO,
    @Query(ValidationPipe) pageOptionsDto: PageOptionsDto,
    @GetUser() user: User,
  ): Promise<PageDto<Buyer>> {
    return this.buyersService.getBuyers(filterDTO, user, pageOptionsDto);
  }

  @Get(':id')
  getBuyerById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Buyer> {
    return this.buyersService.getBuyerById(id, user);
  }

  @Get('any/:id')
  getAnyBuyerById(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: User,
  ): Promise<Buyer> {
    return this.buyersService.getAnyBuyerById(id, user);
  }

  @Post()
  createBuyer(
    @Body() body: CreateBuyerDTO,
    @GetUser() user: User,
  ): Promise<Buyer> {
    return this.buyersService.createBuyer(body, user);
  }

  @Delete(':id')
  deleteBuyer(
    @Param('id', ParseIntPipe) id: number
  ): Promise<IPostResponse> {
    return this.buyersService.deleteBuyer(id);
  }

  @Put(':id')
  updateBuyer(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: CreateBuyerDTO,
      @GetUser() user: User,
  ): Promise<Buyer> {
    return this.buyersService.updateBuyer(id, body, user);
  }
}
