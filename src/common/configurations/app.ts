import { INestApplication, ValidationPipe } from '@nestjs/common';

import { ErrorFilter } from '../filters/common-error.filter';

export const setupApp = (app: INestApplication) => {
    app.enableCors();
    app.useGlobalFilters(new ErrorFilter());
    app.useGlobalPipes(new ValidationPipe({
        validationError: {
            value: false,
            target: false,
        },
    }));
};
