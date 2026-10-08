import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../../../constantsk.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET, // Phải khớp với secret trong JwtModule
    });
  }
  async validate(payload: any) {
    // Dữ liệu trả về sẽ được gắn vào đối tượng req.user
    console.log(payload);
    return { userId: payload.sub, adm_account: payload.adm_account };
  }
}
