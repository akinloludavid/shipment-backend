import {AuthCredentialsDTO, PasswordDTO} from './dto/auth-credentials.dto';
import {UserRepository} from './user.repository';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import {UserSignupDto, UserUpdateDto} from "./dto/user-signup.dto";
import {User} from "./user.entity";
import {GetUsersFilterDTO} from "./dto/users.dto";
import {PageOptionsDto} from "../shared/dtos";
import {PageDto} from "../shared/dtos/page.dto";
import {TokenTypes, UserRole} from "../shared/status.enum";
import {TokenDto} from "../tokens/dto/token.dto";
import {Token} from "../tokens/token.entity";
import {TokenRepository} from "../tokens/token.repository";
import { IPostResponse } from 'src/shared/common.class';
import { MailService } from './../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signUp(userSignupDto: UserSignupDto): Promise<IPostResponse> {
    return this.userRepository.signUp(userSignupDto);
  }

  async getToken(token: string): Promise<string> {
    const tokenByReference = await this.tokenRepository.findOne({
      where: { token },
    });
    if (!tokenByReference) {
      //throw new NotFoundException(`Token ${token} not found`);
      return "";
    }
    return tokenByReference.token;
  }

  async createToken(tokenDto: TokenDto, user: User): Promise<void> {
    const { token } = tokenDto;
    const newToken = new Token();
    newToken.token = token;
    newToken.userId = user.id;
    await newToken.save();
  }

  async requestPasswordReset(email: string): Promise<IPostResponse> {
    const generatedToken: number = Math.floor((Math.random() * 1000000000) + 1);
    

    //save token
    const savedToken = await this.tokenRepository.createToken(String(generatedToken), 0, 0);
    if(!savedToken) {
      return {
        status: false,
        message: "unable to save generated token"
      }
    }

    const sendMail = await this.mailService.sendUserConfirmation(email, String(generatedToken));
    if(sendMail) {
      return sendMail;
    }

    return {
      status: false,
      message: "unable to process request due to unknown error"
    }
  }

  async updateUser(
      userDto: UserUpdateDto,
      userDetail: User
  ): Promise<User> {
    const userById = await this.getUserById(userDetail.id);
    if(userDto.emailaddress)
      userById.emailaddress = userDto.emailaddress;
    if(userDto.firstname)
      userById.firstname = userDto.firstname;
    if(userDto.lastname)
      userById.lastname = userDto.lastname;

    const savedUerById = await userById.save();

    if(savedUerById) {
      delete userById.password;
      delete userById.salt;
      delete userById.emailstring;
      return savedUerById
    }
    
    return userById;
  }

  async getUserByEmail(email?: string): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: { emailaddress: email },
    });

    if(!userByEmail) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return userByEmail;
  }

  async getUserById(id?: number): Promise<User> {

    const userById = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!userById) {
      throw new NotFoundException(`User with id ${id} not found`);
    }


    return userById;
  }

  async getUnfilteredUsers(
      pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<User>> {
    return this.userRepository.getUnfilteredUsers(pageOptionsDto);
  }

  async getAllUsers(
      filterDTO: GetUsersFilterDTO,
      pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<User>> {
    return this.userRepository.getUsers(filterDTO, pageOptionsDto);
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {

    const username = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async resetPassword(passwordDto: PasswordDTO, token: string): Promise<IPostResponse> {
    const { password, emailaddress } = passwordDto;
    if(password && emailaddress) {
      if(token) {
        const tokenByReference = await this.tokenRepository.findOne({
          where: { token },
        });

        if(tokenByReference && tokenByReference.tokentype === TokenTypes.PWDRESET && tokenByReference.used === 0) {

          // update password, then ensure frontend call the use token endpoint
          const userByEmail = await this.getUserByEmail(emailaddress);
          const newSalt = await bcrypt.genSalt();

          const hashedPassword = await UserRepository.hashPassword(password, newSalt);

          userByEmail.salt = newSalt;
          userByEmail.password = hashedPassword;

          const getUserByEmail = await userByEmail.save();
          
          if(getUserByEmail) {
            return {
              status: true,
              message: "password changed successfully"
            }
          }

          return {
            status: false,
            message: "unable to reset password"
          }
        } else {
          throw new BadRequestException("Error: invalid token");
        }
      } else {
        throw new BadRequestException("Error: no token provided");
      }
    } else {
      throw new BadRequestException("Invalid request: please provide a password");
    }

  }
}
