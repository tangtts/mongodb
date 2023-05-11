import { UploadService } from './../service/upload.service';
import { TeacherService } from "../teacher/teacher.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { Student, StudentSchema } from "./schema/student.schema";
import { TeacherController } from "../teacher/teacher.controller";
import { Grade } from 'src/grades/schemas/grade.schema';
import { GradesSchema } from './schema/grades.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Grade.name, schema: GradesSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
