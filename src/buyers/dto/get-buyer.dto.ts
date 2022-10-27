import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import {BuyerStatus} from "../../shared/status.enum";

export class GetBuyersFilterDTO {
  @IsOptional()
  @IsIn([BuyerStatus.DEACTIVATED, BuyerStatus.ACTIVE])
  status?: BuyerStatus;

  @IsOptional()
  @IsNotEmpty()
  nationality?: string;

  @IsOptional()
  @IsNotEmpty()
  representedBy?: string;

  @IsOptional()
  @IsNotEmpty()
  companyRegistrationNumber?: string;
}
