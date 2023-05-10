import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;
      let message = 'Internal server error'
      if(exception.response ){
        if(exception.response.message){
          message = exception.response.message
        }else {
          message = exception.response
        }
      }
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
