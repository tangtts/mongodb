import { UpdateTeacherDTO } from './dtos/update-teacher.dto';
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
import { AuthGuard } from "src/guard/auth.guard";
import { CreateStudentDTO } from "../student/dtos/create-student.dto";
import { CreateTeacherDTO } from "./dtos/create-teacher.dto";
import { SearchStudentDTO } from "../student/dtos/search-student.dto";
import { SearchTeacherDTO } from "./dtos/search-teacher.dto";
import { UpdateStudentDTO } from "../student/dtos/update-student.dto";
import { TeacherService } from "./teacher.service";

@ApiTags("教师模块")
@Controller("teachers")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({
    summary: "新增教师",
  })
  @Post("add")
  create(@Body() teacher: CreateTeacherDTO) {
    return this.teacherService.create(teacher);
  }

  @ApiOperation({
    summary: "查询教师",
  })
  @Post("search")
  getAllTeachers(@Body() teacher: SearchTeacherDTO) {
    return this.teacherService.getAllTeachers(teacher);
  }

  @ApiOperation({
    summary: "查询教师详情",
  })
  @ApiQuery({
    name: "id",
    type: String,
    example: "644f3fb6ef72cc8a71b15d14",
  })
  @Get("details")
  getStudentById(@Query("id") id: string) {
    return this.teacherService.getTeacherById(id);
  }

  @ApiOperation({
    summary: "更新教师详情",
  })
  @Post("update")
  update(@Body() teacher: UpdateTeacherDTO) {
    return this.teacherService.update(teacher);
  }

  @ApiOperation({
    summary: "删除一个教师",
  })
  @ApiQuery({
    name: "id",
    type: String,
    example: "644f3fb6ef72cc8a71b15d14",
  })
  @Get("remove")
  remove(@Query('id') id: string) {
    return this.teacherService.remove(id);
  }

}
