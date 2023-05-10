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

export class CreateStudentDTO {
  @ApiProperty({ example: "好大鸭", description: "用户名" })
  @IsString()
  @IsNotEmpty()
  @Length(0, 10, { message: "内容不能超过十个字符" })
  userName: string;

  @ApiProperty({ example: 20, description: "年龄" })
  @IsNotEmpty()
  // 格式化数字
  @Transform(({ value }) => parseInt(value))
  @Min(10, { message: "年龄不能小于10岁" })
  @Max(50, { message: "年龄不能大于50岁" })
  age: number;

  @ApiProperty({ example: 0, description: "性别" })
  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @ApiProperty({ example: "18623816694", description: "作为学生的联系方式" })
  @IsPhoneNumber("CN")
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    example: "2939117014@qq.com",
    description: "作为学生的联系方式",
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

  @ApiProperty({ example: new Date(), description: "入学时间" })
  // 必须要加上
  @IsNumber()
  @Transform(({ value }) => {
    if (value) {
      return new Date(value).getTime();
    } else {
      return Date.now();
    }
  })
  studyStartTime: number;

  @ApiProperty({ example: "初一一班", description: "班级名称", enum: classes })
  @IsNotEmpty()
  @IsString()
  // 班级名称必须在这里面
  @IsIn(classes, { message: "班级名称必须为 " + classes.join("、") })
  class: string;

  @ApiProperty({ example: "汉族", description: "民族" })
  @IsOptional()
  @IsString()
  nation: string;
}
