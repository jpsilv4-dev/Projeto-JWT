import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login') //temos a rota 'login' que retorna um token ao usuário.
  async login(@Body() user: any) {
    return this.authService.generateToken(user);
  }

  @UseGuards(JwtAuthGuard) //e a rota 'profile' protegida, que só é acessível com um token válido.
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
