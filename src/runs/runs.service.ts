import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRunInput } from './dto/create-run.input';
import { UpdateRunInput } from './dto/update-run.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandler } from 'src/common/utils/error-handler.util';
import { RunFilters } from './dto/run-filters.input';

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  async create(createRunInput: CreateRunInput, userId: string) {
    try {
      return await this.prisma.run.create({
        data: {
          ...createRunInput,
          creatorId: userId,
        },
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
          club: true,
        },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'runs', 'create', userId);
    }
  }

  async findAll(filters?: RunFilters) {
    const where = {};

    if (filters) {
      if (filters.search) {
        where['OR'] = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { location: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
      if (filters.fromDate) {
        where['date'] = {
          ...(where['date'] || {}),
          gte: filters.fromDate,
        };
      }

      if (filters.toDate) {
        where['date'] = {
          ...(where['date'] || {}),
          lte: filters.toDate,
        };
      }

      if (filters.location) {
        where['location'] = { contains: filters.location, mode: 'insensitive' };
      }

      if (filters.minDistance) {
        where['distance'] = {
          ...(where['distance'] || {}),
          gte: filters.minDistance,
        };
      }

      if (filters.maxDistance) {
        where['distance'] = {
          ...(where['distance'] || {}),
          lte: filters.maxDistance,
        };
      }

      if (filters.pace) {
        where['pace'] = filters.pace;
      }

      if (filters.creatorId) {
        where['creatorId'] = filters.creatorId;
      }

      if (filters.clubId) {
        where['clubId'] = filters.clubId;
      }
    }

    try {
      return await this.prisma.run.findMany({
        where,
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
          club: true,
        },
        orderBy: {
          date: 'asc',
        },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'runs', 'find');
    }
  }

  async findOne(id: string) {
    try {
      const run = await this.prisma.run.findUnique({
        where: { id },
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
          club: true,
        },
      });

      if (!run) {
        throw new NotFoundException(`Run with ID ${id} not found`);
      }
      return run;
    } catch (error) {
      ErrorHandler.handlerError(error, 'run', 'find');
    }
  }

  async update(id: string, updateRunInput: UpdateRunInput, userId: string) {
    const run = await this.prisma.run.findUnique({
      where: { id },
      select: { creatorId: true },
    });

    if (!run) {
      throw new NotFoundException(`Run with ID ${id} not found`);
    }

    if (run.creatorId !== userId) {
      throw new ForbiddenException(
        'You dont have permission to update this run',
      );
    }

    try {
      return await this.prisma.run.update({
        where: { id },
        data: updateRunInput,
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
          club: true,
        },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'run', 'update');
    }
  }

  async remove(id: string, userId: string) {
    const run = await this.prisma.run.findUnique({
      where: { id },
      select: { creatorId: true },
    });

    if (!run) {
      throw new NotFoundException(`Run with ID ${id} not found`);
    }
    if (run.creatorId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this run',
      );
    }
    try {
      return await this.prisma.run.delete({
        where: { id },
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
          club: true,
        },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'run', 'delete');
    }
  }

  async registerForRun(runId: string, userId: string) {
    try {
      const run = await this.prisma.run.findUnique({
        where: { id: runId },
        include: {
          participants: true,
        },
      });

      if (!run) {
        throw new NotFoundException(`Run with ID ${runId} not found`);
      }

      const isRegistered = run.participants.some((p) => p.userId === userId);
      if (isRegistered) {
        throw new ForbiddenException('You are already registered for this run');
      }

      await this.prisma.runnerOnRun.create({
        data: {
          userId,
          runId,
        },
      });

      return this.findOne(runId);
    } catch (error) {
      ErrorHandler.handlerError(error, 'run', 'register', userId);
    }
  }

  async cancelRegistration(runId: string, userId: string) {
    try {
      const run = await this.prisma.run.findUnique({
        where: { id: runId },
        include: {
          participants: true,
        },
      });

      if (!run) {
        throw new NotFoundException(`Run with ID "${runId}" not found`);
      }

      const participant = run.participants.find((p) => p.userId === userId);

      if (!participant) {
        throw new ForbiddenException('You are not registered for this run');
      }

      await this.prisma.runnerOnRun.delete({
        where: {
          id: participant.id,
        },
      });
      return this.findOne(runId);
    } catch (error) {
      ErrorHandler.handlerError(error, 'run', 'unregister', userId);
    }
  }

  async getUpcomingRuns() {
    const today = new Date();

    try {
      return this.prisma.run.findMany({
        where: {
          date: {
            gte: today,
          },
        },
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
          club: true,
        },
        orderBy: {
          date: 'asc',
        },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'runs', 'getUpcoming');
    }
  }

  async getUserRuns(userId: string) {
    try {
      return this.prisma.run.findMany({
        where: {
          OR: [
            { creatorId: userId },
            {
              participants: {
                some: {
                  userId,
                },
              },
            },
          ],
        },
        include: {
          creator: true,
          participants: {
            include: {
              user: true,
            },
          },
          club: true,
        },
        orderBy: {
          date: 'asc',
        },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'runs', 'getUserRuns', userId);
    }
  }
}
