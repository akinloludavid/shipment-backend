import {EntityRepository, Repository} from "typeorm";
import {Token} from "./token.entity";
import {TokenTypes} from "../shared/status.enum";
import { IPostResponse } from "src/shared/common.class";

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
    async createToken(token: string, userId: number, used?: number): Promise<IPostResponse> {
        const newToken = new Token();
        newToken.token = token;
        if(used === 0) {
            newToken.used = 0;
            newToken.tokentype = TokenTypes.PWDRESET;
        } else {
            newToken.used = 1;
        }
        newToken.userId = userId;
        const derivedToken = await newToken.save();

        if(derivedToken) {
            // email for token password reset
            return {
                status: true,
                message: "token generated successfully",
                data: derivedToken
            }
        }

        return {
            status: false,
            message: "unable to generate token"
        }
    }
}
