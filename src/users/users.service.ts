import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.UserModel.create(createUserDto);
      await createdUser.save();

      return createdUser;
    } catch (er) {
      throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.UserModel.find();
  }

  async findOne(id: string) {
    const user = await this.UserModel.findById(id);
    if(!user) throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.UserModel.findByIdAndUpdate(id, {...updateUserDto, $inc: { __v: 1 }}, {new: true, runValidators: true})
    return updatedUser;
  }

  async remove(id: string) {
    const removedUser = await this.UserModel.findByIdAndDelete(id);
    if(!removedUser) throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
    return removedUser;
  }
}
