import { PartialType } from '@nestjs/swagger';
import { CreateGradesDTO } from './create-grade.dto';

export class UpdateGradeDto extends PartialType(CreateGradesDTO) {}
