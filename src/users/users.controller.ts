import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIDValidateDTO } from './dto/user-id.dto';
import { AuthGuard, IsAdmin } from './users.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(IsAdmin)
  @Get(':id')
  findOne(@Param() param: UserIDValidateDTO) {
    const { id } = param;
    return this.usersService.findOne(id);
  }

  @UseGuards(IsAdmin)
  @Patch(':id')
  update(
    @Param() param: UserIDValidateDTO,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id } = param;
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param() param: UserIDValidateDTO) {
    const { id } = param;
    return this.usersService.remove(id);
  }
}
