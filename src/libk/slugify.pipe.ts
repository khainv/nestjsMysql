import { PipeTransform, Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugifyPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return value;

    return slugify(value, {
      replacement: '-', // Thay thế khoảng trắng bằng dấu -
      remove: /[*+~.()'"!:@]/g, // Loại bỏ ký tự đặc biệt
      lower: true, // Chuyển thành chữ thường
      locale: 'vi', // Hỗ trợ tiếng Việt tốt nhất
      trim: true,
    });
  }
}
