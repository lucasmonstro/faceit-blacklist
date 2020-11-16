import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';

import mongodbConfig from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(process.cwd(), '.development.env'),
      isGlobal: true,
      load: [mongodbConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
