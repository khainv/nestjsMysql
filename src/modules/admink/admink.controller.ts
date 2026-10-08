import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminkService } from './admink.service.js';
import { SlugifyPipe } from '../../libk/slugify.pipe.js';
import { Admin } from '../../entities/admin.entity.js';
import AddAdminDto from '../../dto/addAdminDto.js';
import EditAdminDto from '../../dto/editAdminDto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('admink')
export class AdminkController {
  constructor(private readonly adminService: AdminkService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  index() {
    return this.adminService.findAll();
  }
  @Get('detail')
  detail(@Query('id', new DefaultValuePipe('1'), ParseIntPipe) id: number) {
    return this.adminService.findOneById(id);
    //return 'check tôi la toi' + id;
  }

  @Patch('update/:id') //mai xem lai ham update
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: string,
    //@Body() body: Partial<Admin>
    @Body() editAdminDto: EditAdminDto,
    @Body('adm_name', SlugifyPipe) adm_rewrite: string,
  ) {
    editAdminDto.adm_rewrite = adm_rewrite;
    return this.adminService.update(+id, editAdminDto);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() addAdminDto: AddAdminDto,
    @Body('adm_name', SlugifyPipe) adm_rewrite: string,
  ) {
    // Gán giá trị đã slugify vào đối tượng body trước khi lưu
    addAdminDto.adm_rewrite = adm_rewrite;
    return this.adminService.create(addAdminDto);
  }
  @Get('testjwt')
  getProfile(@Request() req: any) {
    return req.user; // Trả về thông tin user từ token đã giải mã
  }
}
