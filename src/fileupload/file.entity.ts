import {
  Column,
  Entity,
} from 'typeorm';
import {BasicClass} from "../shared/common.class";

@Entity()
export class FileUpload extends BasicClass {
  @Column("varchar", { length: 200 })
  filename: string;

  @Column()
  userId: number;

  @Column()
  buyerId: number;
}
