import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBiometricDto, AuthDto, AuthSigninDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  //function of sign up
  //@Body collect information from the input field
  //dto means data transfer object, to check password and email field if they are correct
  signup(@Body() dto: AuthDto){
    return this.authService.signup(dto);
  }


  @Post('signin')
  //function of sign in
  signin(@Body() dto: AuthSigninDto, @Req() req, @Res() res){
    return this.authService.signin(dto, req, res);
  }

  @Post('biometric')
  //function of sign in
  biometric(@Body() dto: AuthBiometricDto, @Req() req, @Res() res){
    return this.authService.biometric(dto.biometricKey, req, res);
  }


  @Get('signout')
  //function of sign out
  signout(@Req() req, @Res() res){
    return this.authService.signout(req, res);
  }
}
