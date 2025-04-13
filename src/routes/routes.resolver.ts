import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RoutesService } from './routes.service';
import { Route } from './entities/route.entity';
import { CreateRouteInput } from './dto/create-route.input';
import { UpdateRouteInput } from './dto/update-route.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { RouteDataFilters } from './dto/route-filters.dto';
import GraphQLJSON from 'graphql-type-json';

@Resolver(() => Route)
export class RoutesResolver {
  constructor(private readonly routesService: RoutesService) {}

  @Mutation(() => Route)
  @UseGuards(GqlAuthGuard)
  createRoute(
    @CurrentUser() currentUser: User,
    @Args('createRouteInput') createRouteInput: CreateRouteInput,
  ) {
    return this.routesService.create(createRouteInput, currentUser.id);
  }

  @Query(() => [Route], { name: 'routes' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @CurrentUser() currentUser: User,
    @Args('filters', { nullable: true }) filters?: RouteDataFilters,
  ) {
    return this.routesService.findAll(currentUser.id, filters);
  }

  @Query(() => Route, { name: 'route' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.routesService.findOne(id);
  }

  @Mutation(() => Route)
  @UseGuards(GqlAuthGuard)
  updateRoute(
    @CurrentUser() currentUser: User,
    @Args('updateRouteInput') updateRouteInput: UpdateRouteInput,
  ) {
    return this.routesService.update(
      updateRouteInput.id,
      updateRouteInput,
      currentUser.id,
    );
  }

  @Mutation(() => Route)
  @UseGuards(GqlAuthGuard)
  removeRoute(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.routesService.remove(id, currentUser.id);
  }

  @ResolveField('routeDataJson', () => GraphQLJSON, { nullable: true })
  getRouteDataJson(@Parent() route: Route) {
    try {
      return route.routeData ? JSON.parse(route.routeData) : null;
    } catch {
      return null;
    }
  }
}
