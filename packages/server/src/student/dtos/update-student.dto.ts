import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, isEnum, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPhoneNumber, isString, IsString, Length, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";




import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDTO } from "./create-student.dto";
import mongoose from "mongoose";
// export class UpdateUserDto extends PartialType(
//     OmitType(CreateUserDto, ['email'] as const),
//   ) {}
  
export class UpdateStudentDTO  extends PartialType(CreateStudentDTO) {
    @ApiProperty({ example: "644f3fb6ef72cc8a71b15d14", description: '学生id' })
    @IsString()
    _id:mongoose.Types.ObjectId
}