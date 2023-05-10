import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schema/class.schema';
import { TeacherService } from 'src/teacher/teacher.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { Teacher, TeacherSchema } from 'src/teacher/schema/teacher.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Teacher.name, schema: TeacherSchema },
    ]),
    
  ],
  controllers: [ClassesController],
  providers: [ClassesService]
})
export class ClassesModule {}
