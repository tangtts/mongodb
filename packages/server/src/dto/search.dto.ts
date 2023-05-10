import { IsNumber, IsOptional } from "class-validator";

import {Transform} from "class-transformer"
export class PageDTO {

    @IsNumber()
    @IsOptional()
    pageSize:number = 20

    @IsNumber()
    @IsOptional()
    currentPage:number = 1
}