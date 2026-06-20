import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelationshipsService {
  constructor(private prisma: PrismaService) {}

  async getRunsByRouteId(routeId: string) {
    return this.prisma.run.findMany({
      where: { routeId },
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
  }

  async getRouteForRun(runId: string) {
    const run = await this.prisma.run.findUnique({
      where: { id: runId },
      select: { routeId: true },
    });

    if (!run?.routeId) return null;

    return this.prisma.route.findUnique({
      where: { id: run.routeId },
      include: {
        creator: true,
      },
    });
  }

  async getRunForWorkoutSession(workoutSessionId: string) {
    const workoutSession = await this.prisma.workoutSession.findUnique({
      where: { id: workoutSessionId },
      select: { runId: true },
    });

    if (!workoutSession?.runId) return null;
    return this.prisma.run.findUnique({
      where: { id: workoutSession.runId },
      include: {
        creator: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
    });
  }
  async getWorkoutSessionsByRunId(runId: string) {
    try {
      return this.prisma.workoutSession.findMany({
        where: { runId },
        include: {
          user: true,
          trackPoints: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
    } catch (error) {
      console.error('Error fetching workout sessions for run:', error);
      return [];
    }
  }
}
