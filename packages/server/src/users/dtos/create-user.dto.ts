import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";
import { Roles } from "src/users/schema/user.schema";


export class  CreateUserDTO {
    @ApiProperty({example:"好大鸭",description:'用户名'})
    @IsString()
    @IsNotEmpty()
    userName:string;
  
    @ApiProperty({example:"18623816694",description:'作为唯一验证,防止重复提交'})
    @IsPhoneNumber("CN")
    readonly phoneNumber:string;
  
    @ApiProperty({example:"123456"})
    @IsNotEmpty()
    @Length(3,6)
    password:string

    @ApiProperty({example:"0",enum:Roles})
    @IsEnum(Roles)
    role:string
}