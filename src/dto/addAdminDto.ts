import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class AddAdminDto {
  @IsNumber()
  pro_id: number;

  @IsString()
  adm_name: string;

  @IsNotEmpty()
  @IsString()
  adm_account: string;

  @IsOptional()
  @IsString()
  adm_rewrite?: string; //không bắt buộc khi clinet gửi lên

  @IsNotEmpty()
  @IsString()
  adm_passwords: string;

  @IsEmail()
  adm_email?: string;
}
