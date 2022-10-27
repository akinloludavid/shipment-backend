import { Controller, Get, Param, ParseIntPipe, Post, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { PageOptionsDto } from 'src/shared/dtos';
import { PageDto } from 'src/shared/dtos/page.dto';
import { editFileName, fileFilter } from 'src/shared/utils';
import { GetFilesFilterDTO } from './dto/file-upload.dto';
import { FileUpload } from './file.entity';
import { FileService } from './file.service';

@Controller('files')
@UseGuards(AuthGuard())
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  getFiles(
    @Query(ValidationPipe) filterDTO: GetFilesFilterDTO,
    @Query(ValidationPipe) pageOptionsDto: PageOptionsDto,
    @GetUser() user: User,
  ): Promise<PageDto<FileUpload>> {
    return this.fileService.getFiles(filterDTO, user, pageOptionsDto);
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  async createFileUpload(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @UploadedFile() file: any
    ) {
    return this.fileService.createFileUpload(file.filename, user.id, id)
  }
}