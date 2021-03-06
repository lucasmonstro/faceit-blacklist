import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import mongodbConfig from './config/mongodb.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
      load: [mongodbConfig],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BlacklistModule,
  ],
})
export class AppModule {}
