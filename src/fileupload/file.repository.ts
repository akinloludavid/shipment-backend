import { User } from '../auth/user.entity';
import { GetFilesFilterDTO } from './dto/file-upload.dto';
import {EntityRepository, Repository} from 'typeorm';
import {PageMetaDto, PageOptionsDto} from "../shared/dtos";
import {PageDto} from "../shared/dtos/page.dto";
import {skip} from "../shared/utils";
import {NotFoundException} from "@nestjs/common";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import { FileUpload } from './file.entity';

@EntityRepository(FileUpload)
export class FileRepository extends Repository<FileUpload> {
  async getFiles(filterDTO: GetFilesFilterDTO, user: User, pageOptionsDto?: PageOptionsDto): Promise<PageDto<FileUpload>> {
    const { buyerId, userId, id } = filterDTO;
    const query: SelectQueryBuilder<FileUpload> = this.createQueryBuilder('file_upload');

    query.orderBy("file_upload.id", "DESC")
        .skip(skip(pageOptionsDto))
        .take(pageOptionsDto.take);

    if (buyerId) {
      query.andWhere('file_upload.buyerId = :buyerId', { buyerId });
    }

    if (userId) {
      query.andWhere(
        '(file_upload.userId LIKE :userId)',
        { userId: `%${userId}%` },
      );
    }

    if (id) {
      query.andWhere('file_upload.id = :id', {id});
    }

    const itemCount = await query.getCount();
    const { entities } = await query.getRawAndEntities();

    if (!entities) {
      throw new NotFoundException(`No task found`);
    }

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  
}
