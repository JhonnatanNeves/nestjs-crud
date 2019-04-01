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
import { ClientProxy, Client, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {
  @Client({ transport: Transport.RMQ })
  private client: ClientProxy;

  constructor(private readonly userService: UserService) {}

  async getPlayerProfile(): Promise<any> {
    try {
      const posts = await this.userService.findAll();
      return posts;
    } catch (e) {
      return e;
    }
  }

  @Get()
  async findAll(@Query() query: UserDto, @Res() res): Promise<any> {
    const pattern = { cmd: 'getPlayerProfile' };
    const data = {};
    const fdsfdsfsd = await this.client.send(pattern, data);
    console.log(fdsfdsfsd);
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

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userDto: UserDto, @Res() res): Promise<User> {
    try {
      const post = await this.userService.create(userDto);
      return res.status(HttpStatus.OK).json(post);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
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
