import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "src/users/dtos/create-user.dto";
import { LoginUserDTO } from "src/users/dtos/login-user.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { UserService } from "../services/user.service";

@ApiTags("用户模块")
@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    @ApiOperation({
        summary: "用户注册",
    })
    @Post('register')
    register(@Body() user: CreateUserDTO) {
        return this.userservice.register(user)
    }


    @ApiOperation({
        summary: "用户登录",
    })
    @Post('login')
    login(@Body() user: LoginUserDTO) {
        return this.userservice.login(user)
    }

    @ApiOperation({
        summary: "用户信息",
    })
    @ApiBearerAuth("JWT")
    @Get('info')
    @UseGuards(AuthGuard)
    info(@Req() req: any) {
        console.log(req.user)
    return this.userservice.info(req.user.id)
    }

}