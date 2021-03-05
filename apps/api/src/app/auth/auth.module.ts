import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import { User, UserSchema } from '../schemas/user.schema';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignUpService } from './services/sign-up/sign-up.service';
import { FaceitStrategy } from './strategies/faceit/faceit.strategy';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  providers: [
    FaceitStrategy,
    JwtStrategy,
    SignUpService,
    { provide: APP_GUARD, useClass: GqlAuthGuard },
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('faceit', { session: false }))
      .forRoutes({ path: 'faceit/callback', method: RequestMethod.GET });
  }
}
