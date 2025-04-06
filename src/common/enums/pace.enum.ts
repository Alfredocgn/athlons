import { registerEnumType } from '@nestjs/graphql';

export enum Pace {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  ELITE = 'ELITE',
}

registerEnumType(Pace, { name: 'Pace' });
