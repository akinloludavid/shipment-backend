import {IsNotEmpty, IsOptional, MaxLength} from 'class-validator';

export class FilesUploadDTO {
  @IsNotEmpty()
  @MaxLength(200)
  filename?: string;
}

export class GetFilesFilterDTO {

  @IsOptional()
  @IsNotEmpty()
  buyerId?: number;

  @IsOptional()
  @IsNotEmpty()
  userId?: number;

  @IsOptional()
  @IsNotEmpty()
  id?: number;
}
