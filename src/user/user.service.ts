import { Injectable } from '@nestjs/common';
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

  async create(userDto: UserDto): Promise<any> {
    try {
      return await this.userModel.create({ ...userDto });
    } catch (e) {
      return e;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (e) {
      return e;
    }
  }
}
