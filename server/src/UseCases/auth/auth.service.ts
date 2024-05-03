import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { SignupDto } from './dtos/signup.dto';
import { UsersService } from '../users/users.service';
import { ValidationCodes } from 'src/entities/validationCodes.entity';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private validationCodesRepository: Repository<ValidationCodes>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const existUser = await this.usersService.getOneByEmail(signupDto.email);
    if (!existUser)
      throw new HttpException(
        { message: 'Email já cadastrado no nosso produto anteriormente' },
        HttpStatus.BAD_REQUEST,
      );

    const salt = await bcrypt.genSalt(8);
    const passwordHashed = await bcrypt.hash(signupDto.password, salt);

    const newUser = {
      ...signupDto,
      password: passwordHashed,
    };

    await this.usersService.store(newUser);

    return;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.getOneByEmail(email);
    if (!user)
      throw new HttpException(
        { message: 'Email/Usuário não existe em nossa aplicação!' },
        HttpStatus.BAD_REQUEST,
      );

    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass)
      throw new HttpException(
        { message: 'Senha incorreta!!' },
        HttpStatus.BAD_REQUEST,
      );

    const tokenAndPayload = this.generateJwtToken(user);

    return tokenAndPayload;
  }

  async validateUser(token: string) {
    const payload = await this.jwtService.decode(token);

    const user = await this.usersService.getById(payload.id);
    if (!user) throw new UnauthorizedException();

    const tokenAndPayload = this.generateJwtToken(user);

    return tokenAndPayload;
  }

  private async generateJwtToken(user: Users) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isActivated: user.is_activated,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token, payload };
  }

  async activateUser(userId: string, code: string) {
    const dateNow = Date.now();

    const validationCode = await this.validationCodesRepository.findOne({
      where: { code: code, user: { id: userId } },
    });
    if (validationCode == null || validationCode.expire < dateNow / 1000)
      throw new HttpException(
        { message: 'Código inválido!' },
        HttpStatus.BAD_REQUEST,
      );

    // Atualizar User

    return true;
  }
}
