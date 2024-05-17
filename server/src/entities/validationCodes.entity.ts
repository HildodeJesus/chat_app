import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class ValidationCodes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  code: number;

  @ManyToOne(() => Users, (users) => users.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: Users;

  @Column({ nullable: false })
  expire: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
