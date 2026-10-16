import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//AuthGuard('jwt-refresh') => gọi strategies jwt-refresh
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}