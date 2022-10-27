import {IsIn, IsNotEmpty, IsOptional} from "class-validator";
import {UserGender} from "../../shared/others.enum";

export class GetUsersFilterDTO {
    @IsOptional()
    @IsIn([UserGender.FEMALE, UserGender.MALE])
    gender?: UserGender;
}
