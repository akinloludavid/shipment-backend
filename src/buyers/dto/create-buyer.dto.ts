import {IsIn, IsNotEmpty, IsOptional, MaxLength} from 'class-validator';
import {BuyerStatus} from "../../shared/status.enum";

export class CreateBuyerDTO {
  @IsNotEmpty()
  @MaxLength(200)
  companyName?: string;

  @IsNotEmpty()
  companyAddress?: string;

  @IsNotEmpty()
  companyRegistrationNumber?: string;

  @IsNotEmpty()
  representedBy?: string;

  @IsNotEmpty()
  telephoneFax?: string;

  @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  nationality?: string;

  @IsNotEmpty()
  website?: string;

  @IsOptional()
  @IsIn([BuyerStatus.DEACTIVATED, BuyerStatus.ACTIVE])
  status?: BuyerStatus;
}
