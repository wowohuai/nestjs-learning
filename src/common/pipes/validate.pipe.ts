import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
// 管道应实现 PipeTransform 接口
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
