import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { GradesService } from './grades.service';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SearchGradesDTO } from 'src/grades/dto/search-grades.dto';

import { CreateGradesDTO } from './dto/create-grade.dto';
@ApiTags("成绩模块")
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @ApiOperation({
    summary: "增加一个学生成绩",
  })
  @Post("add")
  addStudentGrade(@Body() grades: CreateGradesDTO) {
    return this.gradesService.create(grades);
  }

  @ApiOperation({
    summary: "查询学生成绩",
  })
  @Post("search")
  searchGrade(@Body() grades: SearchGradesDTO) {
    return this.gradesService.search(grades);
  }

  @ApiOperation({
    summary: "查询成绩详情",
  })
  @Post("detail")
  gradeDetail(@Query("id") id: string) {
    return this.gradesService.detail(id);
  }

  @ApiOperation({
    summary: "删除学生成绩",
  })
  @Get("remove")
  delGrade(@Query("id") id: string) {
    return this.gradesService.del(id);
  }
}
