import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_ROUTER } from '../../../constantsk.js';
export const isPublic = () => SetMetadata(IS_PUBLIC_ROUTER, true);
