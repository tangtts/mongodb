import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Common } from "src/schemas/common.schema";
import { StudentDocument } from "src/student/schema/student.schema";

// TODO 没有定义老师
class Test {
    name: String
    chinese: Number
    math: Number
    english: Number
}
@Schema()
export class Grade extends Common {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
    studentId: StudentDocument[];

    @Prop({
        type: [Test]
    })
    test: Test[];
}
