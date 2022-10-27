import { User } from '../auth/user.entity';
import { GetBuyersFilterDTO } from './dto/get-buyer.dto';
import { CreateBuyerDTO } from './dto/create-buyer.dto';
import { Buyer } from './buyer.entity';
import {EntityRepository, Repository} from 'typeorm';
import {BuyerStatus} from "../shared/status.enum";
import {PageMetaDto, PageOptionsDto} from "../shared/dtos";
import {PageDto} from "../shared/dtos/page.dto";
import {skip} from "../shared/utils";
import {NotFoundException} from "@nestjs/common";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";

@EntityRepository(Buyer)
export class BuyerRepository extends Repository<Buyer> {
  async getBuyers(filterDTO: GetBuyersFilterDTO, user: User, pageOptionsDto?: PageOptionsDto): Promise<PageDto<Buyer>> {
    const { status, nationality, representedBy, companyRegistrationNumber } = filterDTO;
    const query: SelectQueryBuilder<Buyer> = this.createQueryBuilder('buyer');

    query.orderBy("buyer.id", "DESC")
        .skip(skip(pageOptionsDto))
        .take(pageOptionsDto.take);

    if (status) {
      query.andWhere('buyer.status = :status', { status });
    }

    if (nationality) {
      query.andWhere(
        '(buyer.nationality LIKE :nationality)',
        { nationality: `%${nationality}%` },
      );
    }

    if (representedBy) {
      query.andWhere('buyer.representedBy = :representedBy', {representedBy});
    }

    if (companyRegistrationNumber) {
      query.andWhere('buyer.companyRegistrationNumber = :companyRegistrationNumber', {companyRegistrationNumber});
    }

    const itemCount = await query.getCount();
    const { entities } = await query.getRawAndEntities();

    if (!entities) {
      throw new NotFoundException(`No task found`);
    }

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createBuyer(createBuyerDTO: CreateBuyerDTO, user: User): Promise<Buyer> {
    const { representedBy, companyAddress, companyName, companyRegistrationNumber, status, email, website, nationality, telephoneFax } = createBuyerDTO;
    const buyer = new Buyer();
    buyer.telephoneFax = telephoneFax;
    buyer.nationality = nationality;
    buyer.companyAddress = companyAddress;
    buyer.companyName = companyName;
    buyer.representedBy = representedBy;
    buyer.companyRegistrationNumber = companyRegistrationNumber;
    buyer.website = website;
    buyer.status = status;
    buyer.email = email;
    buyer.userId = user.id;

    const savedBuyer = await buyer.save();

    if(savedBuyer) {
      return buyer;
    }
    
  }
}
