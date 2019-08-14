import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiModelProperty()
  @IsString()
  readonly names: string[];

  @ApiModelProperty()
  @IsNumber()
  readonly age: number;

  @ApiModelProperty()
  @IsString()
  readonly breed: string;
}
