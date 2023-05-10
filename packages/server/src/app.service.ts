import { Injectable } from "@nestjs/common";
import { UploadService } from "./service/upload.service";

@Injectable()
export class AppService {
  constructor(private readonly uploadService: UploadService) {}
  getHello(): string {
    return "Hello World!";
  }

  async uploadAvatar(file) {
    const { url } = await this.uploadService.upload(file);
    return { path: "http://localhost:3000" + url };
  }
}
