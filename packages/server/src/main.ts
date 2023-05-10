import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { generateDocument } from "./doc";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./interceptor/transform.interceptor";
import { GlobalExceptionFilter } from "./filter/exception.filter";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  generateDocument(app);

  const uploadDir =
    process.env.UPLOAD_DIR ?? join(__dirname, "../../", "static/upload");

  // 静态服务
  app.useStaticAssets(uploadDir, {
    prefix: "/static/upload",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 用于指定是否在验证之前将原始值转换为 DTO 中定义的类型
      whitelist: true, // 只会校验 dto 中的 数据，额外参数不会校验
      forbidUnknownValues: false, // 否则 upload 会失败
    })
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
