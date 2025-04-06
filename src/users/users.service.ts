import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    try {
      return this.prisma.user.create({
        data: createUserInput,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'User with this information already exists',
        );
      }
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        authUser: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }

    return {
      ...user,
      email: user.authUser.email,
    };
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    await this.findOne(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserInput,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Update would violate unique constraints',
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Cannot delete user because it is referenced by other records',
        );
      }
      throw error;
    }
  }
}
