import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Partial<User>;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwtSecret'),
      });
      const user = await this.userService.findOne(payload?.userId);

      if (!user) {
        throw new UnauthorizedException('Unauthorized user');
      }
      req.user = user;
      req.user.role = user.role;
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }
}
