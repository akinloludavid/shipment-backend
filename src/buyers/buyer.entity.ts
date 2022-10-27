import {
  Column,
  Entity,
} from 'typeorm';
import {BuyerStatus} from "../shared/status.enum";
import {BasicClass} from "../shared/common.class";

@Entity()
export class Buyer extends BasicClass {
  @Column("varchar", { length: 250 })
  companyName: string;

  @Column()
  userId: number;

  @Column("varchar", { length: 250 })
  companyAddress: string;

  @Column({type:"char", length: 20, default: BuyerStatus.ACTIVE})
  status: BuyerStatus;

  @Column("varchar", { length: 35 })
  companyRegistrationNumber: string;

  @Column("varchar", { length: 200 })
  representedBy: string;

  @Column("varchar", { length: 200 })
  nationality: string;

  @Column("varchar", { length: 200 })
  telephoneFax: string;

  @Column("varchar", { length: 200 })
  email: string;

  @Column("varchar", { length: 200 })
  website: string;

}
