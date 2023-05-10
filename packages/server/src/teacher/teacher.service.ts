import { UpdateTeacherDTO } from './dtos/update-teacher.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { Student } from "../student/schema/student.schema";
import { CreateStudentDTO } from "../student/dtos/create-student.dto";
import { SearchStudentDTO } from "../student/dtos/search-student.dto";
import { UpdateStudentDTO } from "../student/dtos/update-student.dto";
import { CreateTeacherDTO } from "./dtos/create-teacher.dto";
import { SearchTeacherDTO } from "./dtos/search-teacher.dto";
import { Teacher } from './schema/teacher.schema';
@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async create(teacher: CreateTeacherDTO) {
    // 根据 手机号,名字 是否存在
    // TODO 可以存在
    console.log(teacher)
    const isExit = await this.teacherModel.findOne({
      phoneNumber: teacher.phoneNumber,
      userName: teacher.userName,
    });
    console.log(isExit);
    let s = new this.teacherModel(teacher);
    return s.save();
  }

  /**
   * @description 获取所有的教师
   * @param searchTeacher
   * @returns
   */
  async getAllTeachers(searchTeacher: SearchTeacherDTO): Promise<{
    data: Teacher[];
    count: number;
  }> {
    const query = {
      ...(searchTeacher.phoneNumber && {
        phoneNumber: { $regex: searchTeacher.phoneNumber, $options: "i" },
      }),
      ...(searchTeacher.userName && {
        userName: { $regex: searchTeacher.userName, $options: "i" },
      }),
      ...(searchTeacher.email && {
        email: { $regex: searchTeacher.email, $options: "i" },
      }),
      ...(searchTeacher.nation && {
        nation: { $regex: searchTeacher.nation, $options: "i" },
      }),
      ...(searchTeacher.address && {
        address: { $regex: searchTeacher.address, $options: "i" },
      }),

      ...(searchTeacher.school && {
        school: { $regex: searchTeacher.school, $options: "i" },
      }),

      ...(searchTeacher.class && {
        class: { $regex: searchTeacher.class, $options: "i" },
      }),

      ...(searchTeacher.sex && {
        sex: { $eq: searchTeacher.sex },
      }),

      age: { $gte: searchTeacher.startAge, $lte: searchTeacher.endAge },

      ...(searchTeacher.startTime &&
        searchTeacher.endTime && {
          startJobTime: {
            $lte: searchTeacher.endTime,
            $gte: searchTeacher.startTime,
          },
        }),
    };

    const teachers = await this.teacherModel.find(query, null, {
      limit: searchTeacher.pageSize,
      skip: searchTeacher.pageSize * (searchTeacher.currentPage - 1),
      sort: { createAt: 1 },
    });
    const count = await this.teacherModel.countDocuments(query);
    return {
      data: teachers,
      count,
    };
  }

  /**
   * @description 根据id 获取教师信息
   * @param id
   * @returns
   */
  async getTeacherById(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findOne( {_id:id} ,{
      createdAt:0,
    });
    if(!teacher){
      throw new NotFoundException("没有找到此教师")
    }
    return teacher;
  }

  /**
   * @description 根据id 更新教师信息
   * @param id
   * @returns Promise<Student>
   */
  async update(teacher: UpdateTeacherDTO): Promise<Teacher> {
    const s = await this.teacherModel.findByIdAndUpdate(
      teacher._id,
      {
        $set: {
          ...teacher,
        },
      },
      { new: true }
    );
    return s;
  }

  /**
   * @description 删除一个教师
   * @param id
   * @returns
   */
  async remove(id: string) {
    let r = await this.teacherModel.findByIdAndRemove(id);
    if(!r){
      throw new NotFoundException("没有找到此教师")
    }
    return;
  }
}
