import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMapping,
  RequestMethod,
} from '@nestjs/common';
import CatsModule from './cat/cats.module';
import LoggerMiddleware from './common/middleware/logger.middleware';
import { CatsController } from './cat/cats.controller';

@Module({
  imports: [CatsModule],
  providers: [],
})
// 中间件不能在 @Module() 装饰器中列出。
// 我们必须使用模块类的 configure() 方法来设置它们。
// 包含中间件的模块必须实现 NestModule 接口。
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类
    // 限制于一个特定的请求
    // consumer.apply(LoggerMiddleware).forRoutes({ path: 'cats', method: RequestMethod.GET });
    // 所有 /cats/*，  /cats/*/*...  路由
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // 传入单个单个控制器
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes(CatsController);
  }
}
