import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminkService } from '../../admink/admink.service.js';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminkService: AdminkService) {
    super({ usernameField: 'adm_account', passwordField: 'adm_password' }); //truong mac dinh cua passport la username và password => usernameField doi sang la adm_acount
  }
  async validate(adm_account: string, adm_password: string) {
    //console.log('1. Đã chạy vào LocalStrategy validate:');
    const adm = await this.adminkService.validateAdmin(
      adm_account,
      adm_password,
    );
    if (!adm) {
      throw new UnauthorizedException(
        `thông tin xác thực không đúng ${adm_account}`,
      );
    }
    return adm; //tra ve thong tin adm, de cắm vào request.user
  }
}
