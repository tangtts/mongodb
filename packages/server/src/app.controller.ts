import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { classes } from './commonData/classes';
import { nations } from './commonData/nations';
import { UploadDTO } from './dto/upload.dto';
import { UploadService } from './service/upload.service';
import { projects } from './commonData/project';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly uploadService: UploadService
    ) {}

  @Get('/chineseNation')
  ChineseNation(){
    return  nations;
  }

  @Get('/classes')
  classes(){
    return  classes;
  }

  @Get('/project')
  project(){
    return projects
  }

  @ApiOperation({
    summary: "上传图片",
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @Post("upload")
  async upload(
    @Req() req: UploadDTO,
    @Body() uploadDTO: UploadDTO,
    @UploadedFile() file
  ) {
    return await this.appService.uploadAvatar(file);
  }
}
