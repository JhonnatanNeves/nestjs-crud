import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UsePipes,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: UserDto, @Res() res): Promise<User> {
    try {
      const posts = await this.userService.findAll();

      return res.status(HttpStatus.OK).json(posts);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    return 'findOne';
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userDto: UserDto, @Res() res): Promise<User> {
    try {
      const posts = await this.userService.create(userDto);
      return res.status(HttpStatus.OK).json(posts);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<string> {
    return 'update';
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res): Promise<User> {
    try {
      const posts = await this.userService.remove(id);
      return res.status(HttpStatus.OK).json(posts);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }
}
