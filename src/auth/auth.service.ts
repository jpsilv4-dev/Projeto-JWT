import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  // Método para gerar hash da senha antes de salvar no banco
  // bcrypt.hash(password, saltRounds) → Gera um hash seguro.
  // saltRounds = 10 → Indica quantas rodadas de encriptação a senha passará.
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Método para verificar a senha
  // bcrypt.compare(password, hashedPassword) → Compara a senha digitada pelo usuário com a senha salva no banco.
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Método para gerar o token JWT
  //payload → Define os dados que estarão no token (id, username).
  //this.jwtService.sign(payload) → Gera um token com as informações do usuário.
  async generateToken(user: any) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}