import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('Information and modification users API')
        .setVersion('V1.0');

    options.addTag('users', 'User endpoints');

    const build = options.build();

    const document = SwaggerModule.createDocument(app, build);

    SwaggerModule.setup('api/docs', app, document);
};
