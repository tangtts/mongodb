import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { Student } from "./schema/student.schema";
import { CreateStudentDTO } from "./dtos/create-student.dto";
import { SearchStudentDTO } from "./dtos/search-student.dto";
import { UpdateStudentDTO } from "./dtos/update-student.dto";
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private readonly jwtService: JwtService,
  ) {}

  async create(student: CreateStudentDTO):Promise<Student> {
    // 根据 手机号,名字 是否存在
    // TODO 可以存在
    const isExit = await this.studentModel.findOne({
      phoneNumber: student.phoneNumber,
      userName: student.userName,
    });
    console.log(isExit,student);

    let s = new this.studentModel(student);
    return s.save();
  }

  /**
   * @description 获取所有的学生
   * @param searchStudent
   * @returns
   */
  async getAllStudent(searchStudent: SearchStudentDTO): Promise<{
    data:Student[],
    count:number
  }> {
    // 筛选条件
    // 可以查询 userName， phoneNumber 性别，民族
    const query = {
      ...(searchStudent.phoneNumber && {
        phoneNumber: { $regex: searchStudent.phoneNumber, $options: "i" },
      }),
      ...(searchStudent.userName && {
        userName: { $regex: searchStudent.userName, $options: "i" },
      }),
      ...(searchStudent.email && {
        email: { $regex: searchStudent.email, $options: "i" },
      }),
      ...(searchStudent.nation && {
        nation: { $regex: searchStudent.nation, $options: "i" },
      }),
      ...(searchStudent.address && {
        address: { $regex: searchStudent.address, $options: "i" },
      }),
      age:{ $gte:searchStudent.startAge,$lte:searchStudent.endAge },

      ...((searchStudent.startTime && searchStudent.endTime) && {
        studyStartTime: {$lte:searchStudent.endTime,$gte:searchStudent.startTime },
      }),
    };

    const students = await this.studentModel.find(query, null, {
      limit: searchStudent.pageSize,
      skip: searchStudent.pageSize * (searchStudent.currentPage - 1),
      sort: { createAt: 1 },
    });
    const count =await this.studentModel.countDocuments(query)

    return {
      data:students,
      count
    };
  }

  /**
   * @description 根据id 获取学生信息
   * @param id
   * @returns
   */
  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findOne({_id:id});
    return student;
  }

  /**
   * @description 根据id 更新学生信息
   * @param id
   * @returns Promise<Student>
   */
  async update(student: UpdateStudentDTO): Promise<Student> {
    const s = await this.studentModel.findByIdAndUpdate(
      student._id,
      {
        $set: {
          ...student,
        },
      },
      { new: true }
    );
    return s;
  }

  /**
   * @description 删除一个学生
   * @param id
   * @returns
   */
  async remove(id: string) {
    let r = await this.studentModel.findByIdAndRemove(id);
    if(!r){
      throw new NotFoundException("没有找到此用户")
    }
    return;
  }

}
