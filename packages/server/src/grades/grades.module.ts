import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade } from './schemas/grade.schema';
import { GradesSchema } from 'src/student/schema/grades.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Grade.name, schema: GradesSchema },
    ]),
  ],
  controllers: [GradesController],
  providers: [GradesService]
})

export class GradesModule {}
