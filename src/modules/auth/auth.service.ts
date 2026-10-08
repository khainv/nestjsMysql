import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminkService } from '../admink/admink.service.js';
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
  ): Promise<{ access_token: string }> {
    const user = await this.adminkService.findOne({ adm_account });
    if (user?.adm_password !== password) {
      throw new UnauthorizedException('password không trùng nhau');
    }
    // Payload chứa thông tin định danh người dùng
    const payload = { sub: user.id, adm_account: user.adm_account };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
