import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { CatsService } from "./cat.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
@ApiTags("cat")
@Controller()
export class CatsController {
  initAge: number;
  constructor(private readonly catsService: CatsService) {
    this.initAge = 1;
  }

  @Post("create")
  async create() {
    let o = {
      age: this.initAge + 1,
      name: "zs",
      details:{
        firstName:"hang",
        lastName:"zhe"
      }
    };
    ++this.initAge;
    return this.catsService.create(o);
  }

  @Get("/findAll")
  @ApiProperty({
    description: "找到所有",
  })
  async findAll() {
    return this.catsService.findAll();
  }
  // 大于 2 岁的
  @Post("/findGt")
  @ApiOperation({
    summary: "找到大于",
    description: "找到大于"
  })
  async findGt(@Body("num") num: Number = 2) {
    return this.catsService.findGt(num);
  }

  @Post("/updateOne")
  @ApiOperation({
    summary: "update",
    description: "update"
  })
  async update() {
    let o = {
      name:"zs",
      age:20
    }
    return this.catsService.update(o);
  }

  @Post("/remove")
  @ApiOperation({
    summary: "remove",
    description: "remove"
  })
  async remove() {
    let o = {
      name:"zs",
      age:20
    }
    return this.catsService.remove();
  }
}
