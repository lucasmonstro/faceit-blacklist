import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import { Blacklist, BlacklistSchema } from '../schemas/blacklist.schema';
import { FaceitStrategy } from './faceit.strategy';
import { JwtStrategy } from './jwt.strategy';
import { SignUpService } from './signUp.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blacklist.name, schema: BlacklistSchema },
    ]),
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
