import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
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
        throw new BadRequestException('Invalid GeoJSON format for routeData');
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
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error.code === 'P2002') {
        throw new ConflictException('A route with this name already exists');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException('Referenced user does not exists');
      }
      console.error('Error creating route:', error);

      throw new InternalServerErrorException(
        'Failed to create route. Please try again later.',
      );
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
      console.error('Error fetching routes:', error);
      throw new InternalServerErrorException('Failed to fetch routes');
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
      throw new InternalServerErrorException('Failed to fetch route details');
    }
  }

  async update(id: string, updateRouteInput: UpdateRouteInput, userId: string) {
    try {
      const existingRoute = await this.findOne(id);

      if (existingRoute.creatorId !== userId) {
        throw new ForbiddenException(
          'You can only update routes that you created',
        );
      }
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
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Route with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('A route with this name already exists');
      }
      console.error(`Error updating route with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update route');
    }
  }

  async remove(id: string, userId: string) {
    try {
      const existingRoute = await this.findOne(id);

      if (existingRoute.creatorId !== userId) {
        throw new ForbiddenException(
          'You can only delete routes that you created',
        );
      }
      return await this.prisma.route.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Route with id ${id} not found`);
      }

      if (error.code === 'P2023') {
        throw new BadRequestException('Cannot delete route');
      }
      throw new InternalServerErrorException(
        `Error deleting route: ${error.message}`,
      );
    }
  }
}
