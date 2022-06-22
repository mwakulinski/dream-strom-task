import { Test, TestingModule } from '@nestjs/testing';
import { StarwarsController } from './starwars.controller';

describe('StarwarsController', () => {
  let controller: StarwarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarwarsController],
    }).compile();

    controller = module.get<StarwarsController>(StarwarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
