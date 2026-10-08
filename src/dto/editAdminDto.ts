import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export default class EditAdminDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  gro_id: number;

  @IsOptional()
  @IsString({ message: 'Tên Addmin phải là chữ' })
  @IsNotEmpty({ message: 'Tên Addmin không được để trống' })
  adm_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  adm_account: string;

  @IsOptional()
  @IsString()
  adm_rewrite?: string; //không bắt buộc khi clinet gửi lên

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Mật khẩu phải có ít nhất 3 ký tự' })
  adm_passwords?: string;

  @IsOptional()
  @IsEmail()
  adm_email?: string;
}
