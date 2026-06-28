import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (!userId) {
      throw new ForbiddenException('No authenticated user found');
    }

    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      select: { role: true },
    });

    const userRoleNames = userRoles.map((r) => r.role);
    const hasRequiredRole = requiredRoles.some((role) => userRoleNames.includes(role as any));

    if (!hasRequiredRole) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    return true;
  }
}
