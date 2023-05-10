import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Post("search")
  search() {
    return this.classesService.search();
  }


  @ApiOperation({
    summary:"老师分类"
  })
  @Get("teachers")
  update() {
    return this.classesService.teachers();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
