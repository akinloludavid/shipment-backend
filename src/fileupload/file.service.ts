import { FileUpload } from './file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPostResponse } from 'src/shared/common.class';
import { FileRepository } from './file.repository';
import { GetFilesFilterDTO } from './dto/file-upload.dto';
import { User } from 'src/auth/user.entity';
import { PageOptionsDto } from 'src/shared/dtos';
import { PageDto } from 'src/shared/dtos/page.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ) {}

  async getFiles(filterDTO: GetFilesFilterDTO, user: User, pageOptionsDto: PageOptionsDto): Promise<PageDto<FileUpload>> {
    return this.fileRepository.getFiles(filterDTO, user, pageOptionsDto);
  }

  async createFileUpload(filename: string, userId: number, id: number): Promise<IPostResponse> {
    const newFile = new FileUpload();
    newFile.buyerId = id;
    newFile.filename = filename;
    newFile.userId = userId;

    const savedFile = await newFile.save();

    if(savedFile) {
      return {
        status: true,
        message: "file uploaded successfully",
        data: savedFile
      }
    }

    return {
      status: true,
      message: "unable to upload file"
    }
  }
}