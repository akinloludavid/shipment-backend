import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { Repository } from 'typeorm';
import { FileRepository } from './file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository]), AuthModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
