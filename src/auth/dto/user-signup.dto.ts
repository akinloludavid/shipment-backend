// noinspection SpellCheckingInspection

import {AuthCredentialsDTO} from "./auth-credentials.dto";
import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {UserGender} from "../../shared/others.enum";

export class UserSignupDto extends AuthCredentialsDTO {

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstname: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @IsEmail()
    emailaddress: string;

    @IsString()
    @IsOptional()
    gender: UserGender;
}

export class UserUpdateDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstname: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @IsEmail()
    emailaddress: string;
}
