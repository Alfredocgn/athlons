import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutSessionsResolver } from './workout-sessions.resolver';
import { WorkoutSessionsService } from './workout-sessions.service';

describe('WorkoutSessionsResolver', () => {
  let resolver: WorkoutSessionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutSessionsResolver, WorkoutSessionsService],
    }).compile();

    resolver = module.get<WorkoutSessionsResolver>(WorkoutSessionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
