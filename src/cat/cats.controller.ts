import {
  Controller,
  Get,
  Req,
  HttpCode,
  Param,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Request } from 'express';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/role.decorater';
import {
  ApiImplicitQuery,
  ApiUseTags,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitFile,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { UserRole } from 'src/user/userRole.enum';
import { FileInterceptor } from '@nestjs/platform-express';

// @ApiBearerAuth()
@ApiUseTags('cats')
@Controller('cats')
export class CatsController {
  // 注入service
  constructor(private readonly catsService: CatsService) { }

  @Get()
  async findAllCats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('ab*d')
  findAll(@Req() req: Request): string {
    return 'the action is return all cats';
  }

  // @Get()
  // @HttpCode(203)
  // findOne(@Req() req: Request): string {
  //   return 'the action is return one cat';
  // }
  // Route parameters
  // @Get(':id')
  // findOneById(@Param() params): string {
  //   return `this is a ${params.id} cat`;
  // }

  @Get(':id')
  @ApiImplicitParam({ name: 'id', required: true })
  findOneById(@Param('id') id): string {
    return `this is a ${id} cat`;
  }

  @Post()
  @Roles('admin')
  // @UsePipes(new ValidationPipe())
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  @Get('/role')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitQuery({
    name: 'role',
    isArray: true,
    enum: ['Admin', 'Moderator', 'User'],
  })
  async filterByRole(@Query('role') role: UserRole = UserRole.User) {
    // role returns: UserRole.Admin, UserRole.Moderator OR UserRole.User
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'List of cats',
  })
  uploadFile(@UploadedFile() file) {
    // console.log(file);
  }
}
