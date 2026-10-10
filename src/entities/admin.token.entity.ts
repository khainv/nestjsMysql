import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tbladmin_token')
export class AdminToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adm_id: number;

  @Column({ nullable: true })
  refesh_token?: string;

  @Column({ nullable: true })
  adm_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
