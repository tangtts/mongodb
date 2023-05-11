import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-class.dto';
import mongoose from 'mongoose';
import { Validate, ValidateBy } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
  @Validate(mongoose.Types.ObjectId)
  _id:mongoose.Types.ObjectId
}
