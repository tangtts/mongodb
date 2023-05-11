import { CreateTeacherDTO } from './create-teacher.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, isEnum, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPhoneNumber, isString, IsString, Length, ValidateNested } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import mongoose from 'mongoose';
// export class UpdateUserDto extends PartialType(
//     OmitType(CreateUserDto, ['email'] as const),
//   ) {}
  
export class UpdateTeacherDTO  extends PartialType(CreateTeacherDTO) {
    // 额外添加属性
    @ApiProperty({ example: "644f3fb6ef72cc8a71b15d14", description: '老师id' })
    @IsString()
    @IsNotEmpty()
    _id:mongoose.Types.ObjectId
}