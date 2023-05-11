import{
  NationsNameTuple,
  NationName,
  nations,
} from "../../commonData/nations";
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";
import { Common } from "../../schemas/common.schema";
import { ClassName, ClassNameTuple,classes } from "src/commonData/classes";
import { StudentDocument } from "src/student/schema/student.schema";
import { Sex } from "../dtos/create-teacher.dto";

export type TeacherDocument = HydratedDocument<Teacher>;


function isClassValid(values: string[]) {
  return values.every(value=>classes.includes(value as ClassName))
}

function isNationNameValid(values:string) {
 return nations.includes(values as NationName)
}

@Schema()
export class Teacher extends Common {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: Number, min: 10, max: 100 })
  age: number;

  @Prop({ type: String, enum: Sex })
  sex: Sex;

  // 民族
  @Prop({ type: String,validate: [isNationNameValid, '无效的民族名称']})
  nation: NationName;

  // 毕业院校
  @Prop({ type: String })
  school: string;

  // 一位老师对应多个班级
  @Prop({ type: [String],validate: [isClassValid, '无效的班级名称']})
  class: string[];

  // 教授的学科
  @Prop({ type: String })
  project: string;

  // 入职时间
  @Prop()
  startJobTime: number;

  // 地址
  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

