import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";
import { Roles } from "src/users/schema/user.schema";


export class  LoginUserDTO {
    @ApiProperty({example:"好大鸭",description:'用户名'})
    @IsNotEmpty()
    userName:string;

    @ApiProperty({example:"123456"})
    @IsNotEmpty()
    @Length(3,6)
    password:string
 
}