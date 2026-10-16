import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_REFRESH_TOKEN_SECRET } from '../../../constantsk.js';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),//nhận refresh_token từ body
      ignoreExpiration: false,
      secretOrKey: JWT_REFRESH_TOKEN_SECRET
    });
  }

  async validate(payload: {
    sub: number;
    adm_account: string;
  }) {
    return {
      userId: payload.sub,
      adm_account: payload.adm_account,
    };
  }
}