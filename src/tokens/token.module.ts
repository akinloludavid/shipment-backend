import { AuthModule } from './../auth/auth.module';
import { TokenRepository } from './token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
    imports: [TypeOrmModule.forFeature([TokenRepository]), AuthModule],
    controllers: [TokenController],
    providers: [TokenService],
})
export class TokenModule {}
