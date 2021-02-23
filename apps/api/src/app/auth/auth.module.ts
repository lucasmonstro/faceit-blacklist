import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import { User, UserSchema } from '../schemas/user.schema';
import { FaceitStrategy } from './faceit.strategy';
import { SignUpService } from './services/sign-up/sign-up.service';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  providers: [FaceitStrategy, JwtStrategy, SignUpService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('faceit', { session: false }))
      .forRoutes({ path: 'faceit/callback', method: RequestMethod.GET });
  }
}
