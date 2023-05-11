import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsDateString,
    IsEmail,
    isEnum,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    isString,
    IsString,
    Length,
    Max,
    Min,
    IsIn,
    Validate,
    NotEquals,

} from "class-validator";
import { Transform, Type } from "class-transformer";
import { ClassName, ClassNameTuple, classes } from "src/commonData/classes";
import mongoose, { ObjectId } from "mongoose";
import { PageDTO } from "src/dto/search.dto";

export enum Sex {
    male = "0",
    female = "1",
}

export class OtherContact {
    @IsString()
    relative: string;

    @IsString()
    name: string;

    @IsNumber()
    phoneNumber: number;
}

export class SearchGradesDTO extends PageDTO{

    @ApiProperty({ example: "好大鸭", description: "学生名称" })
    @IsOptional()
    @IsString()
    studentName: string

    @ApiProperty({ example: "好大鸭", description: "考试名称" })
    @Length(0, 10, { message: "内容不能超过十个字符" })
    @IsString()
    @IsOptional()
    testName: string;

    @ApiProperty({ example: "好大鸭", description: "考试名称" })
    @Length(0, 10, { message: "内容不能超过十个字符" })
    @IsString()
    @IsOptional()
    class: string;

    @ApiProperty({ example: 20, description: "语文成绩" })
    // 格式化数字
    @IsOptional()
    chineseGrade: 0 | 1 | 2

    @ApiProperty({ example: 20, description: "数学成绩" })
    @IsNotEmpty()
    // 格式化数字
    @IsOptional()
    mathGrade: number;

    @ApiProperty({ example: 20, description: "英语成绩" })
    @IsOptional()
    englishGrade: number;



}
