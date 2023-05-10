import { classes } from "./../commonData/classes";
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

  async search() {
    // 查询班级名称，老师名称，学科
    // 学生名称
    // class 中 有 chineseTeacher，mathTeacher，englishTeacher
    // teacher 中有一个
    function getTeacherLookupAndSetStage(teacherFieldName: string): PipelineStage[] {
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
          // 为 null 制成 []
          $set: {
            [teacherFieldName]: { $ifNull: [{ $first: `$${teacherFieldName}` }, {}] },
          },
        },
      ];
    }
    const pipeLine: PipelineStage[] = [
      ...getTeacherLookupAndSetStage("chineseTeacher"),
      ...getTeacherLookupAndSetStage("mathTeacher"),
      ...getTeacherLookupAndSetStage("englishTeacher"),
    ];
    // const pipeLine: PipelineStage[] = [
    //   {
    //     $lookup: {
    //       from: "teachers",
    //       let: { chineseTeacherId: "$chineseTeacher" },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: ["$_id", "$$chineseTeacherId"],
    //             },
    //           },
    //         },
    //       ],
    //       as: "chineseTeacher",
    //     },
    //   },
    //   {
    //     $set: {
    //       chineseTeacher: { $ifNull: [{ $first: "$chineseTeacher" }, []] },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "teachers",
    //       let: { mathTeacherId: "$mathTeacher" },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: ["$_id", "$$mathTeacherId"],
    //             },
    //           },
    //         },
    //         {
    //           $project: {
    //             _id: 0,
    //           },
    //         },
    //       ],
    //       as: "mathTeacher",
    //     },
    //   },
    //   {
    //     $set: {
    //       mathTeacher: { $ifNull: [{ $first: "$mathTeacher" }, []] },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "teachers",
    //       let: { englishTeacherId: "$englishTeacher" },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: ["$_id", "$$englishTeacherId"],
    //             },
    //           },
    //         },
    //         {
    //           $project: {
    //             _id: 0,
    //           },
    //         },
    //       ],
    //       as: "englishTeacher",
    //     },
    //   },
    //   {
    //     $set: {
    //       englishTeacher: { $ifNull: [{ $first: "$englishTeacher" }, []] },
    //     },
    //   },
    // ];
    let r = await this.classModel.aggregate(pipeLine);
    console.log(r);
    return this.classModel.find({});
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
    return teachers[0];
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
