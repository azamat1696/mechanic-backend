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
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    console.log('response', response);
    response.status(status).json({
      statusCode: status,
      message: 'my message',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
