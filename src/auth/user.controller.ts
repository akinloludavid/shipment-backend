import { AuthService } from './auth.service';
import {
    Body,
    Controller, Get,
    Param, ParseIntPipe, Put, Query,
    UseGuards, ValidationPipe,
} from '@nestjs/common';
import {User} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUsersFilterDTO} from "./dto/users.dto";
import {PageOptionsDto} from "../shared/dtos";
import {PageDto} from "../shared/dtos/page.dto";
import {UserUpdateDto} from "./dto/user-signup.dto";
import {GetUser} from "./get-user.decorator";

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
    constructor(private authService: AuthService) {}

    @Get('/filtered')
    getAllUsers(
        @Query(ValidationPipe) filterDTO: GetUsersFilterDTO,
        @Query() pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<User>> {
        return this.authService.getAllUsers(filterDTO, pageOptionsDto);
    }

    @Put('/update')
    updateUser(
        @Body(ValidationPipe) userUpdateDTO: UserUpdateDto,
        @GetUser() user: User,
    ) {
        return this.authService.updateUser(userUpdateDTO, user);
    }

    @Get('/all')
    getUnfilteredUsers(
        @Query() pageOptionsDto: PageOptionsDto
): Promise<PageDto<User>> {
        return this.authService.getUnfilteredUsers(pageOptionsDto);
    }

    @Get(':id')
    getUserById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<User> {
        return this.authService.getUserById(id);
    }
}
