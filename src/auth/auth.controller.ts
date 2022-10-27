import {AuthCredentialsDTO, PasswordDTO} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller, Get,
  HttpCode, Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {UserSignupDto} from "./dto/user-signup.dto";
import { IPostResponse } from 'src/shared/common.class';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body(ValidationPipe) userSignUpDTO: UserSignupDto) {
    return this.authService.signUp(userSignUpDTO);
  }

  @HttpCode(200)
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDTO);
  }

  //password reset
  @Get('password/request/:email')
  requestPasswordReset(
      @Param('email', ValidationPipe) email: string
  ): Promise<IPostResponse> {
    return this.authService.requestPasswordReset(email);
  }

  @HttpCode(200)
  @Post('password/reset/:token')
  resetPassword(
      @Param('token') token: string,
      @Body(ValidationPipe) passwordDto: PasswordDTO,
  ): Promise<IPostResponse> {
    return this.authService.resetPassword(passwordDto, token);
  }
}
