import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [jwtConfig],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
