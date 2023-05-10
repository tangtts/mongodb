import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { Student } from "./schema/student.schema";
import { CreateStudentDTO } from "./dtos/create-student.dto";
import { SearchStudentDTO } from "./dtos/search-student.dto";
import { UpdateStudentDTO } from "./dtos/update-student.dto";
import { Grade } from "src/grades/schemas/grade.schema";
import { CreateGradesDTO } from "./dtos/create-grades.dto";
@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name) private gradeModel: Model<Grade>,
  ) {}

   create(student: CreateGradesDTO) {
    console.log(student)
    let s = new this.gradeModel(student);
    return s.save();
  }

}