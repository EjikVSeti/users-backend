import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorResponse } from './error-response';

const parseErrorCode = code => {
  // tslint:disable-next-line:radix
  const intCode = parseInt(code);
  return intCode >= 100 && intCode < 600 ? intCode : 500;
};

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(parseErrorCode(exception.status))
      .json(new ErrorResponse(exception));
  }
}
