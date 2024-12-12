import { Test, TestingModule } from '@nestjs/testing';
import { FormulaireService } from './formulaire.service';

describe('FormulaireService', () => {
  let service: FormulaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormulaireService],
    }).compile();

    service = module.get<FormulaireService>(FormulaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
