import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, {ObjectId} from "mongoose"

@Schema()
export class Common {

   // 自增_id
   @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  readonly _id: string;
  // 创建时间

  @Prop({ default: Date.now,select:false })
  createdAt: Date;
  // 更新时间
  @Prop({ default: Date.now,select:false })
  updatedAt: Date;

}
export const CommonSchema = SchemaFactory.createForClass(Common);
// 动态更改时间
CommonSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});