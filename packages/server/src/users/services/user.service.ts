import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO } from "src/users/dtos/create-user.dto";
import { LoginUserDTO } from "src/users/dtos/login-user.dto";
import * as crypto from "crypto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../schema/user.schema";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,) { }
  async register(user: CreateUserDTO): Promise<string | User> {

    const existingUser = await this.userModel.findOne({ phoneNumer: user.phoneNumber })
    if (existingUser) {
      return '已经注册过了'
    }
    const { salt, hashPassword } = this.getPassword(user.password);
    let u = new this.userModel({
      userName: user.userName,
      password: hashPassword,
      salt,
      rawPassword: user.password,
      phoneNumer: user.phoneNumber,
      role: "0"
    })
    return u.save()
  }

  async login(user: LoginUserDTO): Promise<{ token: string }> {
    // 检查用户名
    const u = await this.checkLoginForm(user)
    const token = await this.certificate(u);
    return {
      token
    }
  }


  async info(userId: string) {
    const user = await this.userModel.findById({ _id: userId },{_id:0,salt:0})
    if (!user) {
      return new NotFoundException("用户不存在！");
    }
    return user

  }



  async checkLoginForm(user: LoginUserDTO): Promise<User> {
    let u = await this.userModel.findOne({ userName: user.userName })
    if (!u) {
      throw new NotFoundException("用户不存在");
    }
    const { password: dbPassword, salt } = u;
    // 再次加密。比较加密后的结果与数据库是否相等
    const currentHashPassword = this.encrytPassword(user.password, salt);
    if (dbPassword !== currentHashPassword) {
      throw new UnauthorizedException("认证失败");
    }

    return u
  }
  /**
    *
    *
    * @private
    * @param {*} password
    * @return {Object} { salt password}
    * @memberof UserService
    */
  private getPassword(password) {
    const salt = this.makeSalt();
    const hashPassword = this.encrytPassword(password, salt);
    return { salt, hashPassword };
  }
  /**
*
*
* @description 随即盐，产生随机字符串
* @param {number} [len=3]
* @return {string}  产生随机字符串
*/
  private makeSalt(len = 3) {
    return crypto.randomBytes(len).toString('base64')
  }


  /**
   *
   *
   * @export
   * @param {string} password
   * @param {string} salt 随机盐
   * @return {*}  {string} 加密后的字符串
   */
  private encrytPassword(password: string, salt: string): string {
    if (!password || !salt) {
      return ''
    }
    const tempSalt = Buffer.from(salt, "base64");
    return crypto.pbkdf2Sync(password, tempSalt, 1000, 16, 'sha1').toString('base64')
  }

  private async certificate(user: User) {
    const payload = {
      id: user._id,
    };
    const token = this.jwtService.signAsync(payload);
    return token;
  }

}