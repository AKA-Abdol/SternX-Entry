import { Injectable } from '@nestjs/common';

@Injectable()
export class GallatinService {
  getHello(): string {
    return 'Hello World!';
  }
}
