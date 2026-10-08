import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { AdminkModule } from '../admink/admink.module.js';
import { JWT_SECRET } from '../../constantsk.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      //global: true, // Tùy chọn: giúp không cần import JwtModule ở các module khác
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' }, // Thời gian hết hạn của token (ví dụ: 60 giây, hoặc '1h', '7d')
    }),
    forwardRef(() => AdminkModule), // 👈 Bọc trong forwardRef như thế này để hết lỗi thiếu AdminkService
  ],
  exports: [AuthService, JwtAuthGuard, PassportModule],
})
export class AuthModule {}
