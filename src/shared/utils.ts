import { extname } from "path";
import {PageOptionsDto} from "./dtos";

export interface IGeneralResponse {
    status: boolean,
    message: string
}
export const skip = (pageOptions: PageOptionsDto): number => {
    return (pageOptions.page - 1) * pageOptions.take;
}

export const prepareGeneralResponse = (status: boolean, message: string): IGeneralResponse => {
    return {
        status: status,
        message: message
    }
}

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };

  export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(docx|pdf|png|jpg|txt|csx|xls|xlsx)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };
