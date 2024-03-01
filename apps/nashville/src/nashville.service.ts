import { Injectable } from '@nestjs/common';

@Injectable()
export class NashvilleService {
  getHello(): string {
    return 'Hello World!';
  }
}
