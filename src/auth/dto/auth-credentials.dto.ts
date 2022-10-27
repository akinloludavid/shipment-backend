import {
  IsNotEmpty, IsOptional,
  IsString,
  //Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PasswordDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
      /*@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
      })*/
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  emailaddress?: string;
}

export class AuthCredentialsDTO extends PasswordDTO{
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
