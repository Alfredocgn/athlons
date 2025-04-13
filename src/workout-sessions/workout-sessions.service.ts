import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutSessionInput } from './dto/create-workout-session.input';
import { UpdateWorkoutSessionInput } from './dto/update-workout-session.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Prisma } from '@prisma/client';
import { WorkoutSessionFilters } from './dto/workout-session-filters.dto';
import { ErrorHandler } from 'src/common/utils/error-handler.util';

@Injectable()
export class WorkoutSessionsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}
  async create(
    createWorkoutSessionInput: CreateWorkoutSessionInput,
    userId: string,
  ) {
    try {
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new BadRequestException('User does not exists');
      }

      const { trackPoints, ...workoutData } = createWorkoutSessionInput;
      return await this.prisma.$transaction(async (tx) => {
        const workout = await tx.workoutSession.create({
          data: {
            ...workoutData,
            userId,
          },
        });
        if (trackPoints && trackPoints.length > 0) {
          await tx.trackPoint.createMany({
            data: trackPoints.map((point) => ({
              ...point,
              workoutSessionId: workout.id,
            })),
          });
        }
        return await tx.workoutSession.findUnique({
          where: { id: workout.id },
          include: {
            trackPoints: true,
            user: true,
          },
        });
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'workout-sessions', 'create');
    }
  }

  async findAll(userId: string, filters?: WorkoutSessionFilters) {
    try {
      const where: Prisma.WorkoutSessionWhereInput = {
        userId,
      };

      if (filters) {
        if (filters.startDate && filters.endDate) {
          where.date = {
            gte: filters.startDate,
            lte: filters.endDate,
          };
        }

        if (filters.workoutType) {
          where.workoutType = filters.workoutType;
        }
      }

      return await this.prisma.workoutSession.findMany({
        where,
        include: {
          trackPoints: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'workout-sessions', 'find');
    }
  }

  async findOne(id: string, userId?: string) {
    try {
      const where: Prisma.WorkoutSessionWhereInput = { id };

      if (userId) {
        where.userId = userId;
      }
      const workout = await this.prisma.workoutSession.findFirst({
        where,
        include: {
          trackPoints: true,
          user: true,
        },
      });
      if (!workout) {
        throw new NotFoundException(`Session with ID ${id} not found`);
      }
      return workout;
    } catch (error) {
      ErrorHandler.handlerError(error, 'workout-sessions', 'find');
    }
  }

  async update(
    id: string,
    UpdateWorkoutSessionInput: UpdateWorkoutSessionInput,
    userId: string,
  ) {
    try {
      await this.findOne(id, userId);

      const {
        trackPoints,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: _id,
        ...workoutData
      } = UpdateWorkoutSessionInput;
      return await this.prisma.$transaction(async (tx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const workout = await tx.workoutSession.update({
          where: { id },
          data: workoutData,
        });
        if (trackPoints && trackPoints.length > 0) {
          await tx.trackPoint.deleteMany({
            where: { workoutSessionId: id },
          });
          await tx.trackPoint.createMany({
            data: trackPoints.map((point) => ({
              ...point,
              workoutSessionId: id,
            })),
          });
        }
        return await tx.workoutSession.findUnique({
          where: { id },
          include: {
            trackPoints: true,
            user: true,
          },
        });
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'workout-sessions', 'find', id);
    }
  }

  async remove(id: string, userId: string) {
    try {
      await this.findOne(id, userId);

      await this.prisma.trackPoint.deleteMany({
        where: { workoutSessionId: id },
      });

      return await this.prisma.workoutSession.delete({
        where: { id },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'workout-sessions', 'delete', id);
    }
  }

  async getStats(userId: string, startDate: Date, endDate: Date) {
    try {
      const workouts = await this.prisma.workoutSession.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      const totalDistance = workouts.reduce(
        (sum, workout) => sum + workout.distance,
        0,
      );
      const totalDuration = workouts.reduce(
        (sum, workout) => sum + workout.duration,
        0,
      );
      const workoutCount = workouts.length;

      const avgPace =
        totalDistance > 0 ? totalDuration / 60 / totalDistance : 0;

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { weeklyGoal: true },
      });

      const weeklyGoalProgress = user?.weeklyGoal
        ? (totalDistance / user.weeklyGoal) * 100
        : null;
      return {
        totalDistance,
        totalDuration,
        workoutCount,
        avgPace,
        weeklyGoalProgress,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error getting stats', error);
    }
  }
}
