import {BasicClass} from "../shared/common.class";
import {Column, Entity} from "typeorm";
import {MaxLength} from "class-validator";
import {TokenTypes} from "../shared/status.enum";

@Entity()
export class Token extends BasicClass {

    @Column("varchar", { length: 100 })
    token: string;

    @MaxLength(1)
    @Column({type: "tinyint", default: 0})
    used: number;

    @MaxLength(9)
    @Column({type: "int"})
    userId: number;

    @MaxLength(20)
    @Column({type: "varchar", default: TokenTypes.PWDRESET})
    tokentype: TokenTypes;
}
