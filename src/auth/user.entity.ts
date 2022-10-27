import {
  Column,
  Entity, Generated,
  OneToMany,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {IsEmail} from "class-validator";
import {UserRole} from "../shared/status.enum";
import {UserGender} from "../shared/others.enum";
import {BasicClass} from "../shared/common.class";
import { Buyer } from 'src/buyers/buyer.entity';

@Entity()
@Unique(['username'])
export class User extends BasicClass {

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  salt: string;

  @Column("varchar", { length: 40 })
  firstname: string;

  @Column("varchar", { length: 40 })
  lastname: string;

  @Column("varchar", { length: 6, default: UserGender.FEMALE})
  gender: UserGender;

  @Column("char")
  @Generated("uuid")
  emailstring: string;

  @Column("varchar", { length: 100, unique: true })
  @IsEmail()
  emailaddress: string;

  @Column({length: 20, default: UserRole.USER})
  userrole: UserRole;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
