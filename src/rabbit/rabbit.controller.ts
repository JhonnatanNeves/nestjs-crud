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
  EventPattern,
} from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Controller('rabbit')
export class RabbitController {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://localhost:5672`],
      queue: 'my_queue',
      queueOptions: { durable: false },
    },
  })
  client: ClientProxy;

  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Observable<any> {
    const pattern = { cmd: 'users' };
    const data = '';
    return this.client.send(pattern, data);
  }

  @MessagePattern({ cmd: 'users' })
  findAll(@Res() res): Observable<any> {
    try {
      return from(this.userService.findAll());
    } catch (e) {
      return from(e);
    }
  }

  @Post()
  getCreate(@Body() userDto: UserDto): Observable<any> {
    const pattern = { cmd: 'create-user' };
    const data = userDto;
    return this.client.send(pattern, data);
  }

  // @MessagePattern({ cmd: 'create-user' })
  // createUser(data): Observable<any> {
  //   try {
  //     return from(this.userService.create(data));
  //   } catch (e) {
  //     return from(e);
  //   }
  // }
}
