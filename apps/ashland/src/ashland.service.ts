import { Injectable } from '@nestjs/common';

@Injectable()
export class AshlandService {
  getHello(): string {
    return 'Hello World!';
  }
}
