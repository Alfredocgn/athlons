import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema } from './config/joi.validation';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { WorkoutSessionsModule } from './workout-sessions/workout-sessions.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: {
        settings: {
          'request.credentials': 'include',
          'editor.theme': 'dark',
          'editor.reuseHeaders': true,
        },
      },
      introspection: true,
    }),
    ConfigModule.forRoot({
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    EmailModule,
    WorkoutSessionsModule,
  ],
})
export class AppModule {}
