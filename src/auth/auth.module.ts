import { JwtEstrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {HttpModule, Logger, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {UserController} from "./user.controller";
import {TokenRepository} from "../tokens/token.repository";
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ieieifejifeife',
      signOptions: {
        expiresIn: 3600 * 24 * 250,
      },
    }),
    HttpModule,
    Logger,
    TypeOrmModule.forFeature([UserRepository, TokenRepository]),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtEstrategy],
  exports: [JwtEstrategy, PassportModule],
})
export class AuthModule {}
