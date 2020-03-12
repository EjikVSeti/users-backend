import * as stackTrace from 'stack-trace';

import { ConfigurationService } from '../configurations/configuration.service';

class ErrorResponse {
  private code: number;
  private error: any;

  constructor(error) {
    const status = error.getStatus ? error.getStatus() : error.status || 500;

    this.code = status;
    this.error = {
      message: typeof error.message === 'string' ? error.message : undefined,
      data: {
        ...(typeof error.message === 'object' && error.message),
        stack:  ![400, 401, 403, 422].includes(status) && ConfigurationService.isDevMode ? stackTrace.parse(error) : undefined,
      },
    };
  }
}

export { ErrorResponse };
