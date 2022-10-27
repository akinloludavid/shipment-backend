import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeORMConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from "./tokens/token.module";
import { BuyersModule } from './buyers/buyer.module';
import { FileModule } from './fileupload/file.module';

@Module({
  
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      useClass: TypeORMConfig,
    }),
    TokenModule,
    AuthModule,
    BuyersModule,
    FileModule
  ],
  providers: [],
})
export class AppModule {}
