import {Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {TokenService} from "./token.service";
import {Token} from "./token.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";
import { IPostResponse } from "src/shared/common.class";

@Controller('token')
@UseGuards(AuthGuard())
export class TokenController {
    constructor(private tokenService: TokenService) {}

    @Get(':token')
    getTokenByReference(
        @Param('token') token: string
    ): Promise<Token> {
        return this.tokenService.getToken(token);
    }

    @Get('use/:token')
    useToken(
        @Param('token') token: string
    ): Promise<Token> {
        return this.tokenService.useToken(token);
    }

    @Post('/:token')
    createToken(
        @Param('token') token: string,
        @GetUser() user: User,
    ): Promise<IPostResponse> {
        return this.tokenService.createToken(token, user);
    }
}
