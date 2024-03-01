import { Test, TestingModule } from '@nestjs/testing';
import { GallatinController } from './gallatin.controller';
import { GallatinService } from './gallatin.service';

describe('GallatinController', () => {
  let gallatinController: GallatinController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GallatinController],
      providers: [GallatinService],
    }).compile();

    gallatinController = app.get<GallatinController>(GallatinController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gallatinController.getHello()).toBe('Hello World!');
    });
  });
});
