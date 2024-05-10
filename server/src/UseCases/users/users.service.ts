import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from 'src/entities/users.entity';
import { SignupDto } from '../auth/dtos/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async store(signupDto: SignupDto) {
    await this.usersRepository.save(signupDto);

    return;
  }
  async getOneByEmail(email: string) {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');

    queryBuilder.where('users.email = :email', { email });

    const user = await queryBuilder.getOne();

    return user;
  }

  async getById(id: string) {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');

    queryBuilder.where('users.id = :id', { id });

    const user = await queryBuilder.getOne();

    return user;
  }

  async update(id: string, partialUser: Partial<Users>) {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');

    await queryBuilder
      .where('users.id = :id', { id })
      .update()
      .set(partialUser)
      .execute();

    return;
  }
}
