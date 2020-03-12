import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as config from 'config';
import * as path from 'path';

import { IMySqlConfig } from './configuration.types';

const isDevMode = ['dev', ''].includes(process.env.NODE_ENV);

@Injectable()
export class ConfigurationService {
    public static srcDir: string = path.dirname(require.main.filename);

    private static configService = new ConfigService({ ...config });

    static get isDevMode() {
        return isDevMode;
    }

    static get profileConfig(): IMySqlConfig {
        const profile = {
            ...ConfigurationService.configService.get('db').profile,
            entities: [`${ConfigurationService.srcDir}/db/profile/**/*.entity.{js,ts}`],
        };
        return profile;
    }
}
