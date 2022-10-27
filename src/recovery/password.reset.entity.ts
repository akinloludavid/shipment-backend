import {
    Column,
    Entity,
} from 'typeorm';
import {BasicClass} from "../shared/common.class";
import {MaxLength} from "class-validator";

@Entity()
export class PasswordReset extends BasicClass {
    @MaxLength(1)
    @Column({type: "tinyint", default: 0})
    isused: number;

    @Column("varchar", { length: 100 })
    token: string;
}
