import { registerEnumType } from '@nestjs/graphql';
import { Pace } from '@prisma/client';

export { Pace };

registerEnumType(Pace, { name: 'Pace' });
