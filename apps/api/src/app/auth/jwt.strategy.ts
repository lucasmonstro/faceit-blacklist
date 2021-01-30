import { FaceitIDToken } from '@faceit-blacklist/interfaces';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as jwksRsa from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: configService.get('FACEIT_OPENID_JWKS_URI'),
        jwksRequestsPerMinute: 5,
        cache: true,
        rateLimit: true,
      }),
      audience: configService.get('FACEIT_APP_CLIENT_ID'),
      issuer: configService.get('FACEIT_OPENID_ISSUER'),
      algorithms: [configService.get('FACEIT_OPENID_ALGORITHMS')],
    });
  }
  validate(faceitIDToken: FaceitIDToken): FaceitIDToken {
    return faceitIDToken;
  }
}
