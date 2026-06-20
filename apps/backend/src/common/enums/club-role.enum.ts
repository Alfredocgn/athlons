import { registerEnumType } from '@nestjs/graphql';

export enum ClubRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

registerEnumType(ClubRole, { name: 'ClubRole' });
