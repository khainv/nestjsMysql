import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminkService } from '../admink/admink.service.js';
import { JWT_EXPIRE } from '../../constantsk.js';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    //@Inject(forwardRef(() => AdminkService)) // Thêm dòng này nếu khởi động lại vẫn báo lỗi tại Service
    private adminkService: AdminkService,
    private jwtService: JwtService,
  ) {}
  async login(
    adm_account: string,
    password: string,
  ): Promise<{
    access_token: string;
    adm_name: string;
    refresh_token: string;
  }> {
    const user = await this.adminkService.findOne({ adm_account });
    if (user?.adm_password !== password) {
      throw new UnauthorizedException(
        'auth.service.ts | password không trùng nhau',
      );
    }
    // Payload chứa thông tin định danh người dùng
    const payload = { sub: user.id, adm_account: user.adm_account };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    const hashRefeshToken = await bcrypt.hash(refresh_token, 10);
    await this.adminkService.saveRefeshToken(hashRefeshToken, user.id);
    return {
      adm_name: user.adm_name,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
  async verifyRefreshToken(refesh_token: string) {
    const decode = await this.jwtService.decode(refesh_token);
    if (decode) {
      const adm = await this.adminkService.verifyRefreshToken(
        refesh_token,
        decode.sub,
      );
      if (adm) {
        return adm;
      }
    }
    return false;
  }
}
