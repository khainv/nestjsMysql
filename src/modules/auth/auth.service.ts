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
      throw new UnauthorizedException('password không trùng nhau');
    }
    // Payload chứa thông tin định danh người dùng
    const payload = { sub: user.id, adm_account: user.adm_account };

    const refesh_token = await this.jwtService.signAsync(payload, {
      expiresIn: JWT_EXPIRE,
    });
    const hashRefeshToken = await bcrypt.hash(refesh_token, 10);
    this.adminkService.saveRefeshToken(hashRefeshToken, user.id);
    return {
      adm_name: user.adm_name,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refesh_token,
    };
  }
}
