import { registerEnumType } from '@nestjs/graphql';

export enum WorkoutType {
  RUN = 'RUN',
  INTERVAL = 'INTERVAL',
  LONG_RUN = 'LONG_RUN',
  RECOVERY = 'RECOVERY',
  RACE = 'RACE',
  TEMPO = 'TEMPO',
  TRAIL = 'TRAIL',
}

registerEnumType(WorkoutType, { name: 'WorkoutType' });
