import { AuthModule } from '../auth/auth.module';
import { BuyerRepository } from './buyer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BuyersController } from './buyer.controller';
import { BuyersService } from './buyer.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuyerRepository]), AuthModule],
  controllers: [BuyersController],
  providers: [BuyersService],
})
export class BuyersModule {}
