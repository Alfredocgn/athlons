import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class ErrorHandler {
  static handlerError(
    error: any,
    entityName: string,
    operation:
      | 'create'
      | 'update'
      | 'delete'
      | 'find'
      | 'register'
      | 'getUpcoming'
      | 'getUserRuns'
      | 'unregister',
    entityId?: string,
  ): never {
    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException ||
      error instanceof ForbiddenException ||
      error instanceof ConflictException
    ) {
      throw error;
    }

    if (error?.code) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException(
            `A ${entityName} with this ${error.meta?.target || 'property'}`,
          );

        case 'P2025':
          throw new NotFoundException(
            `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} ${
              entityId ? `with ID ${entityId}` : ''
            } not found`,
          );

        case 'P2003':
          throw new BadRequestException(
            `Referenced ${error.meta?.field_name || 'entity'} does not exist`,
          );
        case 'P2023': // Inconsistent column data
          throw new BadRequestException(`Invalid ID format`);
      }
    }

    if (error?.name === 'ValidationError') {
      throw new BadRequestException(error.message);
    }

    // Registrar el error para depuración
    console.error(
      `Error ${operation}ing ${entityName}${entityId ? ` ${entityId}` : ''}:`,
      error,
    );

    // Lanzar un error genérico para otros casos
    throw new InternalServerErrorException(
      `Failed to ${operation} ${entityName}. Please try again later.`,
    );
  }

  static handleValidationError(error: any, message: string): never {
    console.error('Validation error:', error);
    throw new BadRequestException(message);
  }
  static checkPermission(
    resourceOwnerId: string,
    currentUserId: string,
    entityName: string,
    action: 'update' | 'delete' | 'view',
  ): void {
    if (resourceOwnerId !== currentUserId) {
      throw new ForbiddenException(
        `You can only ${action} ${entityName}s that you created`,
      );
    }
  }
}
