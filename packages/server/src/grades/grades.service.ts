import { classes } from "src/commonData/classes";
import { Student } from "./../student/schema/student.schema";
import { PipelineStage } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateGradesDTO } from "./dto/create-grade.dto";
import { SearchGradesDTO } from "./dto/search-grades.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./schemas/grade.schema";
@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private gradeModel: Model<Grade>) {}

  create(grades: CreateGradesDTO) {
    console.log(grades);
    let s = new this.gradeModel(grades);
    return s.save();
  }
  async search(searchGrades: SearchGradesDTO) {
    const query = {
      ...(searchGrades.studentName && {
        studentName: { $regex: searchGrades.studentName, $options: "i" },
      }),
      ...(searchGrades.testName && {
        testName: { $regex: searchGrades.testName, $options: "i" },
      }),
      ...(searchGrades.class && {
        class: { $regex: searchGrades.class, $options: "i" },
      }),
    };
    //  studentId
    // 查找
    // 一个学生的 studentId -> 班级class->获取 className
    //
    let pipeline: PipelineStage[] = [
      { $match: query },
      {
        $lookup: {
          from: "students",
          as: "student",
          foreignField: "_id",
          localField: "studentId",
        },
      },
      {
        $set: {
          className: { $first: "$student.class" },
          userName: { $first: "$student.userName" },
          studentId: { $first: "$student._id" },
        },
      },
      {
        $lookup: {
          from: "classes",
          as: "classes",
          let: { className: "$className" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$className", "$$className"] },
              },
            },
            {
              $lookup: {
                from: "teachers",
                as: "chineseTeacher",
                localField: "chineseTeacher",
                foreignField: "_id",
              },
            },
            {
              $lookup: {
                from: "teachers",
                as: "mathTeacher",
                localField: "mathTeacher",
                foreignField: "_id",
              },
            },
            {
              $lookup: {
                from: "teachers",
                as: "englishTeacher",
                localField: "englishTeacher",
                foreignField: "_id",
              },
            },
            {
              $set: {
                chineseTeacher: { $first: "$chineseTeacher" },
                mathTeacher: { $first: "$mathTeacher" },
                englishTeacher: { $first: "$englishTeacher" },
              },
            },
          ],
        },
      },
      {
        $set: {
          chineseTeacher: { $first: "$classes.chineseTeacher" },
          mathTeacher: { $first: "$classes.mathTeacher" },
          englishTeacher: { $first: "$classes.englishTeacher" },
        },
      },
      {
        $project: {
          student: 0,
          classes: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
      {
        $skip: searchGrades.pageSize * (searchGrades.currentPage - 1),
      },
      {
        $limit: searchGrades.pageSize,
      },
      {
        $sort: {
          createAt: 1,
        },
      },
    ];
    let r = await this.gradeModel.aggregate(pipeline);
    const count = await this.gradeModel.countDocuments(query);
    return {
      data: r,
      count,
    };
  }

  async del(id) {
    await this.gradeModel.findByIdAndDelete(id);
  }
  async detail(id) {
    // this.gradeModel.
  }
}
