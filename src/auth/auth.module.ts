import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'minhaChaveSecreta',//Configuramos o módulo JWT com uma chave secreta e tempo de expiração.
      signOptions: { expiresIn: '1h' }, // Token expira em 1 hora
    }),
  ],
  providers: [AuthService, JwtStrategy],//Registramos a estratégia JWT.
  exports: [AuthService], controllers: [AuthController],
})
export class AuthModule { } //Exportamos o serviço de autenticação para ser usado em outros módulos.