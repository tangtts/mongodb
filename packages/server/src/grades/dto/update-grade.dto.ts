import mongoose, { ObjectId } from 'mongoose';
import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { CreateGradesDTO } from './create-grade.dto';
import { Validate } from 'class-validator';


export class UpdateGradeDto extends IntersectionType(
  PartialType(CreateGradesDTO) ,
  PickType(CreateGradesDTO,["studentId"] as const)
) {

  @ApiProperty({ example: "123456", description: "成绩id" })
  @Validate(mongoose.Types.ObjectId)
  _id:ObjectId
}

// type x  = UpdateGradeDto
// let c:x = {
//   _id: new ObjectId,
//   studentId: new ObjectId
// }
