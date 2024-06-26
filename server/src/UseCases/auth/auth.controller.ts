import { Body, Controller, HttpException, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ConfirmDto } from './dtos/confirm.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    const { email, password } = signinDto;

    const signedUser = await this.authService.signin(email, password);

    return signedUser;
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const { email, name, password } = signupDto;

    await this.authService.signup({ email, password, name });
    const signedUser = await this.authService.signin(email, password);

    return signedUser;
  }

  @Post('activate-user')
  async activateUser(@Body() confirmDto: ConfirmDto) {
    const { code, id } = confirmDto;

    await this.authService.activateUser(id, Number(code));

    return;
  }

  @Post('validate')
  async validate(@Req() req: Request) {
    const authorization = req.headers.authorization;
    if (!authorization)
      throw new HttpException('Necessário está logado no sistema!', 403);

    const token = authorization.split(' ')[1];

    const signedUser = await this.authService.validateUser(token);

    return signedUser;
  }
  //

  //Recovery Password
}
