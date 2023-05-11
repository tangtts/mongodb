import { classes } from "./../commonData/classes";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, PipelineStage, Schema, Types } from "mongoose";
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

  async search() {
    // 查询班级名称，老师名称，学科
    // 学生名称
    // class 中 有 chineseTeacher，mathTeacher，englishTeacher
    // teacher 中有一个
    function getTeacherLookupAndSetStage(
      teacherFieldName: string
    ): PipelineStage[] {
      return [
        {
          $lookup: {
            from: "teachers",
            let: { teacherId: `$${teacherFieldName}` },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$teacherId"],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                },
              },
            ],
            as: teacherFieldName,
          },
        },
        {
          // 为 null 制成 {}
          $set: {
            [teacherFieldName]: {
              $ifNull: [{ $first: `$${teacherFieldName}` }, {}],
            },
          },
        },
      ];
    }
    const pipeLine: PipelineStage[] = [
      ...getTeacherLookupAndSetStage("chineseTeacher"),
      ...getTeacherLookupAndSetStage("mathTeacher"),
      ...getTeacherLookupAndSetStage("englishTeacher"),
    ];
    let r = await this.classModel.aggregate(pipeLine);
    return r;
  }

  /**
   * @description 对老师进行分类
   * @return {*}
   * @memberof ClassesService
   */
  async teachers(): Promise<{
    chineseTeachers: Teacher[];
    mathTeachers: Teacher[];
    englishTeachers: Teacher[];
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
    return teachers[0];
  }

  async getClassById(id: string) {
    // classes 有一个 studentsId 数组，包含 studentId
    let pipeLine: PipelineStage[] = [
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "students",
          as: "students",
          //  studentIds 是一个数组
          localField: "studentIds",
          foreignField: "_id",
        },
      },
      {
        $project: {
          studentIds: 0,
        },
      },
    ];
    let r2 = await this.classModel.aggregate(pipeLine);
    return r2[0];
  }

  async remove(id: string) {
    await this.classModel.findByIdAndRemove(id);
    return;
  }

  async update(updateClassDto:UpdateClassDto){
    await this.classModel.findByIdAndUpdate(updateClassDto._id,updateClassDto);
    return 
  }
}
