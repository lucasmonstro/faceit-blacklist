import { FaceitIDToken, FaceitJWT } from '@faceit-blacklist/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { Strategy } from 'passport-faceit';
import { UserDoc } from '../../../schemas/user.schema';
import { SignUpService } from '../../services/sign-up/sign-up.service';
@Injectable()
export class FaceitStrategy extends Strategy {
  constructor(
    private configService: ConfigService,
    private signUpService: SignUpService
  ) {
    super(
      {
        clientID: configService.get('FACEIT_APP_CLIENT_ID'),
        clientSecret: configService.get('FACEIT_APP_CLIENT_SECRET'),
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        params: FaceitJWT,
        _profile: unknown,
        done: (err: unknown, user?: UserDoc) => void
      ) => this.callback(params, done)
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    passport.use(this); // make old passport strategies work in nestjs ecosystem
  }
  async callback(
    params: FaceitJWT,
    done: (err: unknown, user?: UserDoc) => void
  ) {
    try {
      const { guid: faceitId } = jwt.decode(params.id_token) as FaceitIDToken;
      const user = await this.signUpService.signUp(faceitId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
}
