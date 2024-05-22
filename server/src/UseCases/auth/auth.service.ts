import {
  BadRequestException,
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
import { generateRandomNumbers } from 'src/helpers/generateRandomNumbers';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ValidationCodes)
    private validationCodesRepository: Repository<ValidationCodes>,
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectQueue('send-validation-email') private sendValidationEmail: Queue,
  ) {}

  async signup(signupDto: SignupDto) {
    const existUser = await this.usersService.getOneByEmail(signupDto.email);
    if (existUser)
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

    await this.startUserValidation(signupDto.email);

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

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '3d',
    });

    return { token, payload };
  }

  async startUserValidation(email: string) {
    const code = generateRandomNumbers(1000, 9999);
    const dateNow = Date.now() / 1000;

    const user = await this.usersService.getOneByEmail(email);
    if (!user)
      throw new HttpException('Usuário não existe em nosso sistema!', 400);

    await this.validationCodesRepository.save({
      code,
      user: { id: user.id },
      expire: dateNow,
    });

    this.sendValidationEmail.add(
      {
        code,
        email: user.email,
        name: user.name,
      },
      { delay: 5000 },
    );

    return;
  }

  async validateValidationCode(userId: string, code: number) {
    const dateNow = Date.now();

    const validationCode = await this.validationCodesRepository.findOne({
      where: { code: code, user: { id: userId } },
    });

    if (validationCode == null || validationCode.expire < dateNow * 1000)
      return false;

    return true;
  }

  async activateUser(userId: string, code: number) {
    const validateCode = await this.validateValidationCode(userId, code);
    if (!validateCode) throw new BadRequestException();

    await this.usersService.update(userId, { is_activated: true });

    return;
  }
}
