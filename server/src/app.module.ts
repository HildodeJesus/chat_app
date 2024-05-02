import { Module } from '@nestjs/common';
import typeOrmConfig from './config/typeOrm.config';
import { AuthModule } from './UseCases/auth/auth.module';
import { UsersModule } from './UseCases/users/users.module';

@Module({
  imports: [typeOrmConfig, AuthModule, UsersModule],
})
export class AppModule {}
