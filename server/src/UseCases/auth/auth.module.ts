import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from 'src/config/jwt.config';
import { ValidationCodes } from 'src/entities/validationCodes.entity';
import { Users } from 'src/entities/users.entity';
import bullConfig from 'src/config/bull.config';
import mailerConfig from 'src/config/mailer.config';
import { UsersModule } from '../users/users.module';
import { SendValidationEmailProcessor } from 'src/jobs/SendValidationEmail.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([ValidationCodes, Users]),
    mailerConfig,
    bullConfig,
    BullModule.registerQueue({
      name: 'send-validation-email',
    }),

    jwtConfig,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersModule,
    JwtService,
    SendValidationEmailProcessor,
  ],

  exports: [AuthService],
})
export class AuthModule {}
