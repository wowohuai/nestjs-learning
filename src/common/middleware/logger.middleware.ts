import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

// nest中间件需要实现NestMiddleware 接口
@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    // console.log('request..');
    next();
  }
}
