import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, {
  isValidObjectId,
  Model,
  PipelineStage,
  Types,
} from "mongoose";
import { Teacher } from "src/teacher/schema/teacher.schema";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { Class } from "./schema/class.schema";
@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<Class>,

    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>
  ) {}
  create(createClassDto: CreateClassDto) {
    let s = new this.classModel(createClassDto);
    return s.save();
  }

  search() {
    // 查询班级名称，老师名称，学科
    // 学生名称 
    return this.classModel.find({});
  }

  /**
   * @description 对老师进行分类
   * @return {*} 
   * @memberof ClassesService
   */
  async teachers():Promise<{
    chineseTeachers:Teacher[],
    mathTeachers:Teacher[],
    englishTeachers:Teacher[],
  }> {
    let pipeLine: PipelineStage[] = [
      {
        $facet: {
          chineseTeachers: [
            {
              $match: {
                project: "0",
              },
            },
            {
              $project: {
                createdAt: 0,
                updatedAt: 0,
                nation: 0,
              },
            },
          ],
          mathTeachers: [
            {
              $match: {
                project: "1",
              },
            },
          ],
          englishTeachers: [
            {
              $match: {
                project: "2",
              },
            },
          ],
        },
      },
    ];
    let teachers = await this.teacherModel.aggregate(pipeLine);
    // let chineseTeachers = [], mathTeachers = [], englishTeachers = []
    // let r1 = await this.teacherModel.find({})
    // r1.forEach(item => {
    //   if (item.project == "0") {
    //     chineseTeachers.push(item)
    //   } else if (item.project == '1') {
    //     mathTeachers.push(item)
    //   } else if (item.project == '2') {
    //     englishTeachers.push(item)
    //   }
    // })

    return teachers[0];
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
