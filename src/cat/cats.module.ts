import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // 在几个模块之间共享 CatsService 实例
  // 每个导入 CatsModule 的模块都可以访问 CatsService
  exports: [CatsService],
})
export default class CatsModule {}
