import { Test, TestingModule } from '@nestjs/testing';
import { RunsResolver } from './runs.resolver';
import { RunsService } from './runs.service';

describe('RunsResolver', () => {
  let resolver: RunsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunsResolver, RunsService],
    }).compile();

    resolver = module.get<RunsResolver>(RunsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
