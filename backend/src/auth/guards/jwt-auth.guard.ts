import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: { sub: string; email: string; role: string };
  }
}

@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      return false;
    }

    const token = authorization.split(' ')[1];

    try {
      const payload = await this.jwt.verifyAsync(token);
      request.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}
