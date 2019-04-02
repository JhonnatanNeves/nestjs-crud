import {
  Controller,
  Get,
  Query,
  Body,
  Res,
  ValidationPipe,
  Post,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import {
  Transport,
  Client,
  ClientProxy,
  MessagePattern,
} from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Controller('rabbit')
export class RabbitController {
  @Client({
    transport: Transport.RMQ,
    // options: {
    //   urls: [`amqp://localhost:5672`],
    //   queue: 'my_queue',
    //   // queueOptions: { durable: false },
    // },
  })
  client: ClientProxy;

  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Observable<number> {
    // const pattern = { cmd: 'sumObservable' };
    // const pattern = { cmd: 'sumAsync' };
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3];

    const r = this.client.send<number>(pattern, data);

    return r;
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return data.reduce((acc, el) => acc + el);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() userDto: UserDto, @Res() res): Observable<User> {
    const pattern = { cmd: 'createUser' };
    const data = userDto;

    const post = this.client.send<UserDto>(pattern, data);
    // const post = this.userService.create(userDto);
    return res.status(HttpStatus.OK).json(post);
  }

  @MessagePattern({ cmd: 'createUser' })
  createUser(data: UserDto): any {
    return this.userService.create(data);
  }

  // @MessagePattern({ cmd: 'sum' })
  // async accumulate(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }

  // @MessagePattern({ cmd: 'sum' })
  // sumObservable(data: number[]): Observable<number> {
  //   return from([1, 2, 3]);
  // }
}
