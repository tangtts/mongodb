import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Common } from "../../schemas/common.schema";

export type UserDocument = HydratedDocument<User>;

export enum Roles {
  ADMIN = "0",
  TEACHER = "1",
  STUDENT = "2",
}

@Schema()
export class User extends Common{
  // 自增_id
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  readonly _id: string;


  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  phoneNumer: string;

  @Prop({ required: true })
  role: Roles;


  @Prop({ required: true })
  password: string;


  @Prop({
    type: [String],
  })
  classes: [String]

  @Prop({ type: String })
  salt: string;

  @Prop({ select: false })
  rawPassword: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

