import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TokenRepository} from "./token.repository";
import {Token} from "./token.entity";
import {User} from "../auth/user.entity";
import { IPostResponse } from "src/shared/common.class";


@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(TokenRepository)
        private tokenRepository: TokenRepository,
    ) {}

    async createToken(token: string, user: User): Promise<IPostResponse> {
        return this.tokenRepository.createToken(token, user.id);
    }

    async getToken(token: string): Promise<Token> {
        const tokenByReference = await this.tokenRepository.findOne({
            where: { token },
        });
        if (!tokenByReference) {
            throw new NotFoundException(`Token ${token} not found`);
        }
        return tokenByReference;
    }

    async useToken(
        token: string
    ): Promise<Token> {
        const tokenByReference = await this.getToken(token);
        if(token)
            tokenByReference.used = 1;

        await tokenByReference.save();
        return tokenByReference;
    }
}
