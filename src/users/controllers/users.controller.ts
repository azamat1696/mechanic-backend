/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

// DTOs
import { UpdateUsersDto } from '../dtos/UpdateUsers.dto';
import { CreateUsersDto } from '../dtos/CreateUsers.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Get all users
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  // Get a single user
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  // Create user
  // @Post()
  // @UsePipes(ValidationPipe)
  // createUser(@Body() createUsersDto: CreateUsersDto) {
  //   console.log('Password', createUsersDto.password);
  //   return this.usersService.add(createUsersDto);
  // }

  // Update user
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(id, updateUsersDto);
  }

  // Delete user
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
