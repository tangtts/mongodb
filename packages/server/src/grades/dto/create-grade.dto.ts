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

export class CreateGradesDTO {

    @ApiProperty({ example: "好大鸭", description: "学生id" })
    @Validate(mongoose.Types.ObjectId)
    studentId: ObjectId

    @ApiProperty({ example: "好大鸭", description: "考试名称" })
    @Length(0, 10, { message: "内容不能超过十个字符" })
    @IsString()
    @IsNotEmpty()
    testName: string;

    @ApiProperty({ example: 20, description: "语文成绩" })
    @IsNotEmpty()
    // 格式化数字
    @Transform(({ value }) => parseInt(value))
    @Min(0, { message: "成绩不能小于0" })
    @Max(100, { message: "成绩不能大于100" })
    chineseGrade: number;

    @ApiProperty({ example: 20, description: "数学成绩" })
    @IsNotEmpty()
    // 格式化数字
    @Transform(({ value }) => parseInt(value))
    @Min(0, { message: "成绩不能小于0" })
    @Max(100, { message: "成绩不能大于100" })
    mathGrade: number;

    @ApiProperty({ example: 20, description: "英语成绩" })
    @IsNotEmpty()
    // 格式化数字
    @Transform(({ value }) => parseInt(value))
    @Min(0, { message: "成绩不能小于0" })
    @Max(100, { message: "成绩不能大于100" })
    englishGrade: number;
}
