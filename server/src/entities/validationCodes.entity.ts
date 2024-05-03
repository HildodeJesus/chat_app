import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class ValidationCodes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  code: string;

  @OneToMany(() => Users, (users) => users.id, {
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
