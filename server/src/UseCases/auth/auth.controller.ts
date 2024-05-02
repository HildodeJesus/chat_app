import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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

  @Post('validate')
  async validate(@Req() req: Request) {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];

    const signedUser =
      await this.authService.validateAndGenerateNewJwtToken(token);

    return signedUser;
  }
  //

  //Recovery Password
}
