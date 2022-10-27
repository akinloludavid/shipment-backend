// noinspection SpellCheckingInspection

import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException, NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import {UserSignupDto} from "./dto/user-signup.dto";
import {GetUsersFilterDTO} from "./dto/users.dto";
import {PageMetaDto, PageOptionsDto} from "../shared/dtos";
import {PageDto} from "../shared/dtos/page.dto";
import {skip} from "../shared/utils";
import { IPostResponse } from 'src/shared/common.class';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userSignupDto: UserSignupDto): Promise<IPostResponse> {
    const { username, password, emailaddress, firstname, gender, lastname } = userSignupDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await UserRepository.hashPassword(password, user.salt);
    user.lastname = lastname;
    user.emailaddress = emailaddress;
    user.firstname = firstname;
    user.gender = gender;

    try {
      const savedUser = await user.save();
      if(savedUser) {
        delete savedUser.password;
        delete savedUser.salt;
        delete savedUser.emailstring;
        return {
          status: true,
          message: "Signup successful",
          data: savedUser
        }
      }

      return {
        status: false,
        message: "Unable to complete signup"
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(error?.sqlMessage);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUnfilteredUsers(
      pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<User>> {
    const query = this.createQueryBuilder('user');

    query
        .orderBy("user.id", pageOptionsDto.order)
        .skip(skip(pageOptionsDto))
        .take(pageOptionsDto.take);

    const itemCount = await query.getCount();
    const { entities } = await query.getRawAndEntities();

    if (!entities) {
      throw new NotFoundException(`No users found`);
    }

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getUsers(filterDTO: GetUsersFilterDTO, pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const { gender } = filterDTO;
    const query = this.createQueryBuilder('user');

    query.orderBy("user.id", "DESC")
        .skip(skip(pageOptionsDto))
        .take(pageOptionsDto.take);
    
    if (gender) {
      query.where('user.gender = :gender', { gender });
    }

    const itemCount = await query.getCount();
    const { entities } = await query.getRawAndEntities();

    if (!entities) {
      throw new NotFoundException(`No users found`);
    }

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async validateUserPassword(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<string> {
    const { username, password } = authCredentialsDTO;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
    return null;
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
