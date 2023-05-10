import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreateGradeDto } from "src/grades/dto/create-grade.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { CreateGradesDTO } from "./dtos/create-grades.dto";
import { CreateStudentDTO } from "./dtos/create-student.dto";
import { SearchStudentDTO } from "./dtos/search-student.dto";
import { UpdateStudentDTO } from "./dtos/update-student.dto";
import { GradesService } from "./grades.service";
import { StudentService } from './student.service';

@ApiTags("学生模块")
@Controller("students")
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly gradesService: GradesService
    ) {}



  @ApiOperation({
    summary: "增加一个学生成绩",
  })
 
  @Post("addGrades")
  addStudentGrades(@Body() grades: CreateGradesDTO) {
    return this.gradesService.create(grades);
  }


  @ApiOperation({
    summary: "新增学生",
  })
  @Post("add")
  create(@Body() student: CreateStudentDTO) {
    return this.studentService.create(student);
  }

  @ApiOperation({
    summary: "查询学生",
  })
  @Post("search")
  getAllStudent(@Body() student: SearchStudentDTO) {
    return this.studentService.getAllStudent(student);
  }

  @ApiOperation({
    summary: "查询学生详情",
  })
  @ApiQuery({
    name: "id",
    type: String,
    example: "644f3fb6ef72cc8a71b15d14",
  })
  @Get("details")
  getStudentById(@Query("id") id: string) {
    return this.studentService.getStudentById(id);
  }

  @ApiOperation({
    summary: "更新学生详情",
  })
  @Post("update")
  update(@Body() student: UpdateStudentDTO) {
    return this.studentService.update(student);
  }

  @ApiOperation({
    summary: "删除一个学生",
  })
  @ApiQuery({
    name: "id",
    type: String,
    example: "644f3fb6ef72cc8a71b15d14",
  })
  @Get("remove")
  remove(@Query('id') id: string) {
    return this.studentService.remove(id);
  }







}
