import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {MaxLength} from "class-validator";

export class BasicClass extends BaseEntity {
    @PrimaryGeneratedColumn()
    @MaxLength(9)
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}

export interface IPostResponse {
    status: boolean;
    message: string;
    data?: any;
}