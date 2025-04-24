import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesResolver } from './routes.resolver';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [RoutesResolver, RoutesService],
  imports: [PrismaModule, UsersModule, SharedModule],
  exports: [RoutesService],
})
export class RoutesModule {}
