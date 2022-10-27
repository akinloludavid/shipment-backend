import {IsIn, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {TokenTypes} from "../../shared/status.enum";

export class TokenDto {
    @IsString()
    @MaxLength(50)
    token: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1)
    used: number;

    @IsOptional()
    @IsIn([
        TokenTypes.PWDRESET
    ])
    tokentype: TokenTypes;
}
