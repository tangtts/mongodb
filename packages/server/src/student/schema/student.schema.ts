import nations, { NationsNameTuple, NationName } from './../../commonData/nations';
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";
import { Common } from "../../schemas/common.schema";
import { OtherContact, Sex } from "../dtos/create-student.dto";
import { ClassName, ClassNameTuple } from 'src/commonData/classes';

export type StudentDocument = HydratedDocument<Student>;



@Schema()
export class Student extends Common {

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  phoneNumber: string;


  @Prop({ type: Number,min:10,max:30 })
  age: number;

  // 不能直接使用 enum 类型
  @Prop({ type: String,enum: Sex })
  sex: Sex;

  @Prop({ type: String})
  nation: NationName;

  @Prop({ type: String})
  class: ClassName;

  @Prop({type:Number})
  studyStartTime:number

  @Prop()
  email: string;

  @Prop()
  avatar: string

  @ApiProperty({
    example: "xx省yy市",
    description: "家庭地址"
  })
  @Prop()
  address: string
}

export const StudentSchema = SchemaFactory.createForClass(Student);

