import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships/relationships.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RelationshipsService],
  exports: [RelationshipsService],
})
export class SharedModule {}
