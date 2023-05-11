import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGradesDTO } from './dto/create-grade.dto';
import { SearchGradesDTO } from './dto/search-grades.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './schemas/grade.schema';
@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name) private gradeModel: Model<Grade>,
  ) {}

   create(student: CreateGradesDTO) {
    console.log(student)
    let s = new this.gradeModel(student);
    return s.save();
  }
  async search(searchGrades:SearchGradesDTO){
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
    const students = await this.gradeModel.find(query, null, {
      limit: searchGrades.pageSize,
      skip: searchGrades.pageSize  * (searchGrades.currentPage - 1),
      sort: { createAt: 1 }
    });
    const count =await this.gradeModel.countDocuments(query)
    return {
      data:students,
      count
    };
  }
}