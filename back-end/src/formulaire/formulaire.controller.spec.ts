import { Test, TestingModule } from '@nestjs/testing';
import { FormulaireController } from './formulaire.controller';

describe('FormulaireController', () => {
  let controller: FormulaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormulaireController],
    }).compile();

    controller = module.get<FormulaireController>(FormulaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
