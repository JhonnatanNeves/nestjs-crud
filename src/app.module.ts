import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/crudnestjs'),
    UserModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
