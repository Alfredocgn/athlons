import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRouteInput } from './dto/create-route.input';
import { UpdateRouteInput } from './dto/update-route.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import {
  isValidRouteGeoJSON,
  calculateRouteDistance,
} from './helpers/geo-validation.helper';
import { RouteDataFilters } from './dto/route-filters.dto';
import { filterRoutesByProximity } from './helpers/geo-validation.helper';
import { ErrorHandler } from 'src/common/utils/error-handler.util';

@Injectable()
export class RoutesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}
  async create(createRouteInput: CreateRouteInput, userId: string) {
    try {
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new BadRequestException('User does not exists');
      }

      if (!isValidRouteGeoJSON(createRouteInput.routeData)) {
        ErrorHandler.handleValidationError(
          null,
          'Invalid GeoJson format for routeData',
        );
      }

      if (!createRouteInput.distance) {
        const calculatedDistance = calculateRouteDistance(
          createRouteInput.routeData,
        );
        createRouteInput.distance = calculatedDistance;
      }
      const route = await this.prisma.route.create({
        data: {
          ...createRouteInput,
          creatorId: userId,
        },
        include: {
          creator: true,
        },
      });
      return route;
    } catch (error) {
      ErrorHandler.handlerError(error, 'route', 'create');
    }
  }

  async findAll(userId: string, filters?: RouteDataFilters) {
    try {
      const where: any = {};

      if (filters?.creatorId) {
        where.creatorId = filters.creatorId;
      }

      if (
        filters.minDistance !== undefined ||
        filters.maxDistance !== undefined
      ) {
        where.distance = {};
        if (filters?.minDistance !== undefined) {
          where.distance.gte = filters.minDistance;
        }
        if (filters?.maxDistance !== undefined) {
          where.distance.lte = filters.maxDistance;
        }
      }
      if (
        filters?.minElevation !== undefined ||
        filters.maxElevation !== undefined
      ) {
        where.elevation = {};
        if (filters?.minElevation !== undefined) {
          where.elevation.gte = filters.minElevation;
        }
        if (filters?.maxElevation !== undefined) {
          where.elevation.lte = filters.maxElevation;
        }
      }

      if (
        filters?.createdAfter !== undefined ||
        filters?.createdBefore !== undefined
      ) {
        where.createdAt = {};
        if (filters?.createdAfter !== undefined) {
          where.createdAt.gte = filters.createdAfter;
        }
        if (filters?.createdBefore !== undefined) {
          where.createdAt.lte = filters.createdBefore;
        }
      }

      const routes = await this.prisma.route.findMany({
        where,
        include: {
          creator: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: filters?.limit || 10,
        skip: filters?.offset || 0,
      });
      if (
        filters?.nearLatitude &&
        filters?.nearLongitude &&
        filters?.radiusKm
      ) {
        return filterRoutesByProximity(
          routes,
          filters.nearLatitude,
          filters.nearLongitude,
          filters.radiusKm,
        );
      }
      return routes;
    } catch (error) {
      ErrorHandler.handlerError(error, 'route', 'find');
    }
  }

  async findOne(id: string) {
    try {
      const where: any = { id };

      const route = await this.prisma.route.findUnique({
        where,
        include: {
          creator: true,
        },
      });
      if (!route) {
        throw new NotFoundException(`Route with ID ${id} not found`);
      }
      return route;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      console.error(`Error fetching route with ID ${id}:`, error);
      ErrorHandler.handlerError(error, 'route', 'find');
    }
  }

  async update(id: string, updateRouteInput: UpdateRouteInput, userId: string) {
    try {
      const existingRoute = await this.findOne(id);

      ErrorHandler.checkPermission(
        existingRoute.creatorId,
        userId,
        'route',
        'update',
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: routeId, ...updateData } = updateRouteInput;

      if (updateData.routeData) {
        if (!isValidRouteGeoJSON(updateData.routeData)) {
          throw new BadRequestException('Invalid GEOJSOn format for routeData');
        }

        if (updateData.routeData && !updateData.distance) {
          updateData.distance = calculateRouteDistance(updateData.routeData);
        }
      }
      const updatedRoute = await this.prisma.route.update({
        where: { id },
        data: updateData,
        include: {
          creator: true,
        },
      });

      return updatedRoute;
    } catch (error) {
      ErrorHandler.handlerError(error, 'route', 'update', id);
    }
  }

  async remove(id: string, userId: string) {
    try {
      const existingRoute = await this.findOne(id);

      ErrorHandler.checkPermission(
        existingRoute.creatorId,
        userId,
        'route',
        'delete',
      );
      return await this.prisma.route.delete({
        where: { id },
      });
    } catch (error) {
      ErrorHandler.handlerError(error, 'route', 'delete', id);
    }
  }
}
