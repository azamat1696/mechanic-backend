/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // console.log('exception', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    // console.log('==>', exception.getResponse());
    response.status(status).json({
      statusCode: status,
      path: request.url,
      data: exception.getResponse(),
      timestamp: new Date().toISOString(),
    });
  }
}
