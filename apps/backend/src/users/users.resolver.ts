import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateProfile(
    @CurrentUser() currentUser: User,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    if (currentUser.id !== updateProfileInput.id) {
      throw new UnauthorizedException('You can only update your own profile');
    }
    return this.usersService.updateProfile(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Query(() => User, { name: 'myProfile' })
  @UseGuards(GqlAuthGuard)
  getMyProfile(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }
}
