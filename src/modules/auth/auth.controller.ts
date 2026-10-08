import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AdminkService } from '../admink/admink.service.js';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminkService: AdminkService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    //console.log(req.user.adm_account);
    console.log(req.user.adm_account);
    // Nếu không tìm thấy, chủ động ném ra lỗi 404 của NestJS
    if (!req.user.adm_password) {
      throw new NotFoundException(
        `Không tìm thấy tài khoản ${req.adm_account} này`,
      );
    }
    return this.authService.login(req.user.adm_account, req.user.adm_password); //gọi autheService để save to access-token
  }
}
