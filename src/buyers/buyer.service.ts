import {User} from '../auth/user.entity';
import {BuyerRepository} from './buyer.repository';
import {GetBuyersFilterDTO} from './dto/get-buyer.dto';
import {CreateBuyerDTO} from './dto/create-buyer.dto';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Buyer} from './buyer.entity';
import {PageOptionsDto} from "../shared/dtos";
import {PageDto} from "../shared/dtos/page.dto";
import { IPostResponse } from 'src/shared/common.class';

@Injectable()
export class BuyersService {
  constructor(
    @InjectRepository(BuyerRepository)
    private buyerRepository: BuyerRepository,
  ) {}

  async getBuyers(filterDTO: GetBuyersFilterDTO, user: User, pageOptionsDto: PageOptionsDto): Promise<PageDto<Buyer>> {
    return this.buyerRepository.getBuyers(filterDTO, user, pageOptionsDto);
  }

  async getBuyerById(id: number, user: User): Promise<Buyer> {
    const buyer = await this.buyerRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!buyer) {
      throw new NotFoundException(`Buyer with id ${id} not found`);
    }
    return buyer;
  }

  async getAnyBuyerById(id: number, user: User): Promise<Buyer> {
    const buyer = await this.buyerRepository.findOne({
      where: { id },
    });

    if (!buyer) {
      throw new NotFoundException(`Buyer with id ${id} not found`);
    }

    return buyer;
  }

  async createBuyer(createBuyerDTO: CreateBuyerDTO, user: User): Promise<Buyer> {
    return this.buyerRepository.createBuyer(createBuyerDTO, user);
  }

  async deleteBuyer(id: number): Promise<IPostResponse> {
    const result = await this.buyerRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Buyer with id ${id} not found`);
    }

    if(result) {
      return {
        status: true,
        message: "Buyer info deleted successfully"
      }
    }

    return {
      status: false,
      message: "Unable to delete buyer Info"
    }
  }

  async updateBuyer(
      id: number,
      buyer: CreateBuyerDTO,
      user: User,
  ): Promise<Buyer> {
    const buyerById = await this.getBuyerById(id, user);
    if(buyer.companyAddress)
      buyerById.companyAddress = buyer.companyAddress;
    if(buyer.companyName)
      buyerById.companyName = buyer.companyName;
    if(buyer.companyRegistrationNumber)
      buyerById.companyRegistrationNumber = buyer.companyRegistrationNumber
    if(buyer.email)
      buyerById.email = buyer.email
    if(buyer.representedBy)
      buyerById.representedBy = buyer.representedBy
    if(buyer.status)
      buyerById.status = buyer.status
    if(buyer.website)
      buyerById.website = buyer.website
    if(buyer.telephoneFax)
      buyerById.telephoneFax = buyer.telephoneFax
    
    await buyerById.save();
    return buyerById;
  }
}
