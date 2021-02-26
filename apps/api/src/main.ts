import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserInputError } from 'apollo-server-express';
import { useContainer } from 'class-validator';
import * as mongoose from 'mongoose';
import { AppModule } from './app/app.module';
async function bootstrap() {
  mongoose.set('returnOriginal', false);
  mongoose.set('useFindAndModify', false);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) => {
        const errors = {};
        for (const { constraints, property } of validationErrors) {
          const keyNotExistsInErrors = !errors[property];
          if (keyNotExistsInErrors) {
            errors[property] = constraints;
          }
        }
        return new UserInputError('BAD_USER_INPUT', errors);
      },
      transform: true,
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    Logger.log(`Listening at http://localhost:${port}`)
  );
}
bootstrap();
