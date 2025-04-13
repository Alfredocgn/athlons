import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Int,
  Root,
} from '@nestjs/graphql';
import { RunsService } from './runs.service';
import { Run } from './entities/run.entity';
import { CreateRunInput } from './dto/create-run.input';
import { UpdateRunInput } from './dto/update-run.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { RunFilters } from './dto/run-filters.input';

@Resolver(() => Run)
export class RunsResolver {
  constructor(private readonly runsService: RunsService) {}

  @Mutation(() => Run)
  @UseGuards(GqlAuthGuard)
  createRun(
    @CurrentUser() currentUser: User,
    @Args('createRunInput') createRunInput: CreateRunInput,
  ) {
    return this.runsService.create(createRunInput, currentUser.id);
  }

  @Query(() => [Run], { name: 'runs' })
  findAll(@Args('filters', { nullable: true }) filters?: RunFilters) {
    return this.runsService.findAll(filters);
  }

  @Query(() => Run, { name: 'run' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.runsService.findOne(id);
  }

  @Mutation(() => Run)
  @UseGuards(GqlAuthGuard)
  updateRun(
    @CurrentUser() currentUser: User,
    @Args('updateRunInput') updateRunInput: UpdateRunInput,
  ) {
    return this.runsService.update(
      updateRunInput.id,
      updateRunInput,
      currentUser.id,
    );
  }

  @Mutation(() => Run)
  @UseGuards(GqlAuthGuard)
  removeRun(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.runsService.remove(id, currentUser.id);
  }

  @Mutation(() => Run)
  @UseGuards(GqlAuthGuard)
  registerForRun(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.runsService.registerForRun(id, currentUser.id);
  }

  @Mutation(() => Run)
  @UseGuards(GqlAuthGuard)
  cancelRegistration(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.runsService.cancelRegistration(id, currentUser.id);
  }

  @Query(() => [Run], { name: 'upcomingRuns' })
  getUpcomingRuns() {
    return this.runsService.getUpcomingRuns();
  }

  @Query(() => [Run], { name: 'myRuns' })
  @UseGuards(GqlAuthGuard)
  myRuns(@CurrentUser() currentUser: User) {
    return this.runsService.getUserRuns(currentUser.id);
  }

  @ResolveField(() => Int)
  participantCount(@Root() run: Run): number {
    return run.participants?.length || 0;
  }
}
