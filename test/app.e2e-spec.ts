import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as supertest from 'supertest';
import {
    Test as Request,
    Response,
    SuperTest,
} from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let request: SuperTest<Request>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = await moduleFixture.createNestApplication();
        await app.init();
        request = await supertest(app.getHttpServer());
    });

    afterAll(async () => {
        await app.close();
    });

    it('/ (POST)', async () => {
        const response: Response = await request
            .post('users')
            .send({ name: 'Tom', surname: 'Cat', email: 'tom_cat@email.com' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                version: expect.any(String),
            }),
        );
    });
});
