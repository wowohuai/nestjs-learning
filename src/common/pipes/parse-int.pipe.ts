import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  transform(value: string, metatype: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
