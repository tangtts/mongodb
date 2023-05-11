import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { ObjectId } from "mongoose";
import { StudentDocument } from "src/student/schema/student.schema";

export class CreateClassDto {
  @ApiProperty({
    default: "班级1",
    description: "班级名称",
  })
  @IsString()
  @IsNotEmpty({message:"缺少班级名称"})
  className: string;

  @ApiProperty({
    default: "645b414773f51055b1c60c12",
    description: "语文老师",
  })
  @IsString()
  @IsNotEmpty({message:"请输入语文老师名称"})
  chineseTeacher: ObjectId;

  @ApiProperty({
    default: "645b414773f51055b1c60c12",
    description: "数学老师",
  })
  @IsString()
  @IsNotEmpty({message:"请输入数学老师名称"})
  mathTeacher: ObjectId;

  @ApiProperty({
    default: "645b41bb0ec8224e579b0690",
    description: "英语老师",
  })
  @IsString()
  @IsNotEmpty({message:"请输入英语老师名称"})
  englishTeacher: ObjectId;

  @ApiProperty({
    default: ["645b361ef20a50e34d8643ce"],
    description: "学生 ID 数组",
  })
  @ArrayMinSize(1, { message: "至少需要一个学生 ID" })
  @ArrayMaxSize(10, { message: "最多支持十个学生 ID" })
  studentIds: ObjectId[];
}
