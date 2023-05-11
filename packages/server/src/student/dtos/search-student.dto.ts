import { ClassName } from './../../commonData/classes';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEmail, isEnum, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPhoneNumber, isString, IsString, Length, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { PageDTO } from "src/dto/search.dto";

 enum Sex {
    all = "",
    male = 0,
    female = 1
}



export class SearchStudentDTO extends PageDTO {
    @ApiProperty({ example: "好大鸭", description: '用户名' })
    @IsString()
    @IsOptional()
    userName: string;

    @ApiProperty({ example: 20, description: '年龄' })
    @IsOptional()
    // 格式化数字
    @Transform(({ value }) => parseInt(value))
    startAge: number = 0;

    @ApiProperty({ example: 20, description: '年龄' })
    @IsOptional()
    // 格式化数字
    @Transform(({ value }) => parseInt(value))
    endAge: number = 100;

    @ApiProperty({ example: 1686153600000, description: '时间' })
    @IsOptional()
    // 格式化时间戳
    @Transform(({ value }) => new Date(value).getTime())
    startTime: number;

    @ApiProperty({ example: 1686153600000, description: '时间' })
    @IsOptional()
    // 格式化时间戳
    @Transform(({ value }) => new Date(value).getTime())
    endTime: number;

    @IsString()
    @IsOptional()
    className:string

    @ApiProperty({ example: "2939117014", description: '邮箱' })
    @IsString()
    @IsOptional()
    email:string

    @ApiProperty({ example: 0, description: '性别' })
    @IsOptional()
    sex: Sex;

    @ApiProperty({ example: 0, description: '民族' })
    @IsString()
    @IsOptional()
    nation: string;


    @ApiProperty({ example: "18623816694", description: '作为学生的联系方式' })
    @IsOptional()
    phoneNumber: string;


    @ApiProperty({
        example: "xx省yy市",
        description: "家庭地址"
    })
    @IsString()
    @IsOptional()
    address: string

}