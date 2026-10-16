import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Request,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AdminkService } from '../admink/admink.service.js';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { isPublic } from './filter/is.public.router.js';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard.js';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminkService: AdminkService,
  ) {}
  @isPublic() //bo qua jwt-auth.guard.ts cai global
  @UseGuards(LocalAuthGuard) //Kích hoạt LocalAuthGuard
  @Post('login')
  async login(@Request() req: any) {
    //console.log(req.user.adm_account);
    console.log('auth.controller | check xem có chạy vào đây không');
    // Nếu không tìm thấy, chủ động ném ra lỗi 404 của NestJS
    if (!req.user.adm_password) {
      throw new NotFoundException(
        `auth.controller | Không tìm thấy tài khoản ${req.adm_account} này`,
      );
    }
    return this.authService.login(req.user.adm_account, req.user.adm_password); //gọi autheService để save to access-token
  }
  @isPublic() //bo qua jwt-auth.guard.ts cai global
  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: any }) {
    if (!refreshToken) {
      throw new BadRequestException('refresh token không tồn tại');
    }
    const adm = await this.authService.verifyRefreshToken(refreshToken);
    if (adm) {
      const adm1 = await this.adminkService.findOneById(adm.adm_id);
      //update lại refresh token moi trong database
      return this.authService.login(adm1.adm_account, adm1.adm_password);
    } else {
      return 'lỗi auth.controller.ts';
    }
  }
}
