import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../config/extends/custom-request';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    req.lang = req.headers['accept-language'] || 'en';
    next();
  }
}
