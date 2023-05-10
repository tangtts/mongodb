import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret, jwtSignOptions } from "src/constants";
import { User, UserSchema } from "./schema/user.schema";

@Module(({
    imports: [MongooseModule.forFeature(
        [{ name: User.name, schema: UserSchema }]
    ),
    JwtModule.register({
        global: true,
        secret: jwtSecret,
        signOptions: jwtSignOptions,
    })
    ],
    controllers: [UserController],
    providers: [UserService],
}))
export class UserModule { }