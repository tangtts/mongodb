import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto } from './createCat.dto';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) { }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    // const createdCats = await this.catModel.insertMany([createCatDto,createCatDto],{
    //   lean:true
    // });
    // return createdCats;

    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<any> {
    // const cats = await this.catModel.find({},{name:0}).sort({ age:"descending"});
    // 只要最后一项
    // 查找 contact 数组有值，并且不能是 ['1','2']

    const cats = await this.catModel.find({}, { name: 1, _id: 0, contact: { $slice: [0, 1] } });
    return cats;
  }

  async findGt(num: Number): Promise<Cat[]> {
    // return this.catModel.find({ age: { $gt: num } },{name:1});
    // 查询 tags 含有 cute 或者 white 或者 happy
    return this.catModel.find({}, { tags: { $elemMatch: { $eq: "cute" } } });
  }
  async update(createCatDto: CreateCatDto): Promise<Cat> {
    // return this.catModel.find({ age: { $gt: num } },{name:1});
    // 查询 tags 含有 cute 或者 white 或者 happy
    // let r =  this.catModel.updateOne({name:createCatDto.name},{name:"zssss"})
    // console.log(r)
    // return 
    // 如果我想更新之后的数据覆盖原来的
    // return this.catModel.findOneAndUpdate({name:createCatDto.name},{$min:{ age:createCatDto.age}, $mul:{age:2}},{new:true});

    // {$addToSet:{ tags:{$each:['red','happy']}}},
    // 删除对象
    return this.catModel.findOneAndUpdate(
      { name: createCatDto.name },
      { $pull: { tags:"t"} },
      { new: true }
    );
  }

  async remove(): Promise<Cat> {
    // this.catModel.drop()
    let s = await this.catModel.deleteMany({age:2})
   console.log( s.deletedCount)
     return
  }
}
