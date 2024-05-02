import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(signupDto: SignupDto) {}
  async signin(email: string, password: string) {}
  async validateAndGenerateNewJwtToken(token: string) {}
}
