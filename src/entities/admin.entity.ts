import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tbladmin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gro_id: number;

  @Column()
  adm_account: string;

  @Column()
  adm_password: string;

  @Column()
  adm_name: string;

  @Column()
  adm_rewrite: string;

  @Column({ nullable: true })
  adm_mobile: string;

  @Column({ nullable: true })
  adm_email: string;

  @Column({ nullable: true })
  adm_level: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 1 })
  adm_status: number;
}
