import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Admin } from '../../entities/admin.entity.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminkService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}
  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }
  async findOne(fields: FindOptionsWhere<Admin>): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: fields,
    });
    //console.log('admink.service.findOne ', admin);
    // Nếu không tìm thấy, chủ động ném ra lỗi 404 của NestJS
    if (!admin) {
      throw new NotFoundException(`Không tìm thấy tài khoản Admin này`);
    }
    return admin;
  }
  async findOneById(id: number): Promise<Admin[]> {
    const admin = await this.adminRepository.find({
      where: { id },
    });
    // Nếu không tìm thấy, chủ động ném ra lỗi 404 của NestJS
    if (!admin || admin.length == 0) {
      throw new NotFoundException(
        `Không tìm thấy tài khoản Admin với ID = ${id}`,
      );
    }
    return admin;
  }
  async create(adminData: Partial<Admin>): Promise<Admin> {
    // 1. Tạo một instance mới từ DTO (chưa lưu vào DB)
    const adm = this.adminRepository.create(adminData);
    if (!adminData.adm_password) {
      throw new BadRequestException('Mật khẩu không được để trống');
    }
    const passHashed = await bcrypt.hash(adminData.adm_password, 10);
    adm.adm_password = passHashed;
    // 2. Lưu instance này vào cơ sở dữ liệu
    return this.adminRepository.save(adm);
  }
  async update(id: number, adminData: Partial<Admin>): Promise<Admin> {
    //await this.adminRepository.update(id, adminData);
    let adm2 = await this.adminRepository.findOne({ where: { id } });
    console.log('id:', id);
    console.log('adminData:', adminData);
    if (!adm2) {
      throw new NotFoundException(
        `Không update tài khoản Admin với ID = ${id} để cập nhật`,
      );
    }
    if (adminData.adm_name !== undefined) {
      adm2.adm_name = adminData.adm_name;
    }
    await this.adminRepository.save(adminData);
    return adm2;
  }
  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
  async validateAdmin(adm_account: string, adm_password: string) {
    const adm = await this.findOne({ adm_account });
    if (!adm) {
      return null;
    }
    const status = await bcrypt.compareSync(adm_password, adm.adm_password);
    //console.log('admink.service.validateAdmin', status);
    if (status) {
      return adm;
    }
    return null;
  }
}
