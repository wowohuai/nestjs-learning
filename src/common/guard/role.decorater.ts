import { SetMetadata } from '@nestjs/common';

// 定义一个Role装饰器
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
