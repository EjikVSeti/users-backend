import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { ConfigurationService } from './common/configurations/configuration.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(ConfigurationService.profileConfig),
  ],
})
export class AppModule {}
