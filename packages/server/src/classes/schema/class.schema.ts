import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose, ObjectId } from "mongoose";
import { StudentDocument } from "src/student/schema/student.schema";

export type ClassDocument = HydratedDocument<Class>;
@Schema()
export class Class {
    @Prop({type:String})
    className:string

    @Prop({type:mongoose.Types.ObjectId})
    chineseTeacher: ObjectId

    @Prop({type:mongoose.Types.ObjectId})
    mathTeacher: ObjectId

    @Prop({type:mongoose.Types.ObjectId})
    englishTeacher: ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId})
    studentIds: ObjectId[];
}
export const ClassSchema = SchemaFactory.createForClass(Class);


