import nations, { NationsNameTuple, NationName } from '../../commonData/nations';
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";
import { Common } from "../../schemas/common.schema";
import { ClassName, ClassNameTuple } from 'src/commonData/classes';

import { ObjectId } from "mongoose";
export type GradesDocument = HydratedDocument<Grades>;
@Schema()
export class Grades extends Common {

  @Prop({ type: mongoose.Schema.Types.ObjectId,required:true })
  studentId:ObjectId;

  @Prop({ required: true })
  testName: string;

 @ApiProperty({
  description:"语文成绩"
 })
  @Prop({ type: Number,min:0,max:100})
  chineseGrades: number;

  @ApiProperty({
    description:"数学成绩"
   })
  @Prop({ type: Number,min:0,max:100 })
  mathGrades: number;

  @ApiProperty({
    description:"英语成绩"
   })
  @Prop({ type: Number,min:0,max:100 })
  englishGrades: number;
}

export const GradesSchema = SchemaFactory.createForClass(Grades);

