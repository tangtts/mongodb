import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({ default: true })
  order_id: string;

  @Prop({default:0})
  age: number;

  @Prop({default:"white"})
  color: string;

  @Prop({
    type:[String],
    default:["white","cute"]
  })
  products: string[];

  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    })
  )
  details: Record<string, any>;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
