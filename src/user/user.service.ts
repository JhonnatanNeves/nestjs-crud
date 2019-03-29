import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<any> {
    try {
      return await this.userModel.find();
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (e) {
      return e;
    }
  }

  async create(userDto: UserDto): Promise<any> {
    try {
      return await this.userModel.create({ ...userDto });
    } catch (e) {
      return e;
    }
  }

  async update(id: string, userDto: UserDto): Promise<any> {
    try {
      return await this.userModel.findOneAndUpdate({ _id: id }, userDto);
    } catch (e) {
      return e;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      return await this.userModel.findOneAndDelete({ _id: id });
    } catch (e) {
      return e;
    }
  }
}
