import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiTags("班级模块")
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}


  @ApiOperation({
    summary: "新增班级",
  })
  @Post("add")
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @ApiOperation({
    summary:"查询所有班级"
  })
  @Post("search")
  search() {
    return this.classesService.search();
  }

  @ApiOperation({
    summary:"分类老师"
  })
  @Get("teachers")
  teachers() {
    return this.classesService.teachers();
  }

  @ApiOperation({
    summary:"班级详情"
  })
  @Get("details")
  getClassById(@Query("id") id: string) {
    return this.classesService.getClassById(id);
  }

  @Post('update')
  update(@Body() updateClassDto:UpdateClassDto) {
    return this.classesService.update(updateClassDto);
  }


  @Get('remove')
  remove(@Query('id') id: string) {
    return this.classesService.remove(id);
  }
}
