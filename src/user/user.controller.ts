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
import { MessagePattern } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
// import { ClientProxy, Client, Transport } from '@nestjs/microservices';
// import { Observable } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: UserDto, @Res() res): Promise<any> {
    try {
      const posts = await this.userService.findAll();
      return res.status(HttpStatus.OK).json(posts);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res): Promise<string> {
    try {
      const post = await this.userService.findOne(id);
      return res.status(HttpStatus.OK).json(post);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async create(@Body() userDto: UserDto, @Res() res): Promise<User> {
  //   try {
  //     const post = await this.userService.create(userDto);
  //     return res.status(HttpStatus.OK).json(post);
  //   } catch (e) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
  //   }
  // }

  @MessagePattern({ cmd: 'create-user' })
  createUser(data): Observable<any> {
    try {
      return from(this.userService.create(data));
    } catch (e) {
      return from(e);
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
    @Res() res,
  ): Promise<User> {
    try {
      const post = await this.userService.update(id, userDto);
      return res.status(HttpStatus.OK).json(post);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res): Promise<User> {
    try {
      const post = await this.userService.remove(id);
      return res.status(HttpStatus.OK).json(post);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }
}
