import { BadRequestException, PipeTransform } from '@nestjs/common';
import {BuyerStatus} from "../../shared/status.enum";

export class BuyerStatusPipe implements PipeTransform {
  readonly allowedStatuses = [
    BuyerStatus.ACTIVE,
    BuyerStatus.DEACTIVATED,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid post status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
