import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { StudentModule } from './student/student.module';
import { UploadService } from './service/upload.service';
import { GradesModule } from './grades/grades.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassesModule } from './classes/classes.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/school'),
    UserModule,
    StudentModule,
    TeacherModule,
    ClassesModule,
    GradesModule,
  ],
  controllers: [AppController],
  providers: [AppService,UploadService],
})
export class AppModule {}
