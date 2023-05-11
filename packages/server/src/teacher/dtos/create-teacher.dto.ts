import { nations } from "../../commonData/nations";
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
  isNotEmpty,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { ClassName, ClassNameTuple, classes } from "src/commonData/classes";

export enum Sex {
  male = "0",
  female = "1",
}


export class CreateTeacherDTO {
  @ApiProperty({ example: "好大鸭", description: "用户名" })
  @IsString()
  @IsNotEmpty()
  @Length(0, 10, { message: "用户名不能超过十个字符" })
  userName: string;

  @ApiProperty({ example: 30, description: "年龄" })
  @IsNotEmpty()
  // 格式化数字
  @Transform(({ value }) => parseInt(value))
  @Min(20, { message: "年龄不能小于20岁" })
  @Max(60, { message: "年龄不能大于60岁" })
  age: number;

  @ApiProperty({ example: 0, description: "性别" })
  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @ApiProperty({ example: "18623816694", description: "作为联系方式" })
  @IsPhoneNumber("CN")
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    example: "2939117014@qq.com",
    description: "作为联系方式",
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: "",
    description: "头像地址",
  })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    example: "xx省yy市",
    description: "家庭地址",
  })
  @IsString()
  @IsOptional()
  address: string;


  @ApiProperty({
    example: "xx学校",
    description: "毕业院校",
  })
  @IsString()
  @IsOptional()
  school: string;
  

  @ApiProperty({ example: new Date(), description: "入职时间" })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value).getTime())
  startJobTime: string | number;

  @ApiProperty({
    example: ["初一一班"],
    description: "班级名称",
    enum: classes,
  })
  @IsNotEmpty()
  @IsArray() // 每一个必须符合
  @IsString({ each: true })
  class: [string];

  // 第一个是类型
  //@IsArray() // 每一个必须符合
  // @IsNumber({ maxDecimalPlaces: 2 }, { message: '最多只能有两位小数' })
  // pi: number;

  @ApiProperty({ example: "汉族", description: "民族" })
  @IsOptional()
  @IsString()
  @IsIn(nations, { message: "民族必须为 " + nations.join("、") + "中的一个" })
  nation: string;

  @ApiProperty({ example: 0, description: "语文" })
  @IsNotEmpty()
  @Transform(({value})=> parseInt(value))
  project: number;
}
