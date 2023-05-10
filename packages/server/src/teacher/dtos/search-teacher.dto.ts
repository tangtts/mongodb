import { ApiProperty } from "@nestjs/swagger";
import {
  isArray,
  IsArray,
  IsDate,
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
  Validate,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { PageDTO } from "src/dto/search.dto";

enum Sex {
  all = "",
  male = 0,
  female = 1,
}

export class SearchTeacherDTO extends PageDTO {
  @ApiProperty({ example: "好大鸭", description: "用户名" })
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({ example: 20, description: "年龄" })
  @IsOptional()
  // 格式化数字
  @Transform(({ value }) => parseInt(value))
  startAge: number;

  @ApiProperty({ example: 20, description: "年龄" })
  @IsOptional()
  // 格式化数字
  @Transform(({ value }) => parseInt(value))
  endAge: number;

  @ApiProperty({ example: 1686153600000, description: "开始时间" })
  @IsOptional()
  // 格式化时间戳
  @Transform(({ value }) => new Date(value).getTime())
  startTime: number;

  @ApiProperty({ example: 1686153600000, description: "结束时间" })
  @IsOptional()
  // 格式化时间戳
  @Transform(({ value }) => new Date(value).getTime())
  endTime: number;

  @ApiProperty({ example: "2939117014", description: "邮箱" })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 0, description: "性别" })
  @IsOptional()
  sex: Sex;

  @ApiProperty({ example: 0, description: "民族" })
  @IsString()
  @IsOptional()
  nation: string;

  @ApiProperty({ example: "18623816694", description: "联系方式" })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    example: "xx省yy市",
    description: "家庭地址",
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    example: "初一一班",
    description: "班级名称",
  })
  @IsOptional()
  @IsString()
  class: string;

  @ApiProperty({
    example: "清华",
    description: "毕业院校",
  })
  @IsString()
  @IsOptional()
  school?: string;
}
