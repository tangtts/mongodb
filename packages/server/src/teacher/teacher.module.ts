import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentController } from "src/student/student.controller";
import { StudentService } from "src/student/student.service";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { Teacher, TeacherSchema } from "./schema/teacher.schema";

@Module(({
    imports: [MongooseModule.forFeature(
        [{ name: Teacher.name, schema: TeacherSchema }]
    )],
    controllers: [TeacherController],
    providers: [TeacherService],
    exports:[TeacherService],
}))
export class TeacherModule { }