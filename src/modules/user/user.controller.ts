import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorator/public.decorator';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { CreateAdminDto, CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { pick } from 'radash';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('admin')
  @HttpCode(201)
  async createAdmin(@Body() createAdmin: CreateAdminDto) {
    const createdUser = await this.userService.createAdmin(createAdmin);
    if (!createdUser.email) {
      throw new InternalServerErrorException();
    }
    const payload = { sub: createdUser.id, email: createdUser.email };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: pick(createdUser, ['email', 'name']),
    };
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.findAllNonAdminUsers();
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() params: { id: string }) {
    return this.userService.deleteUser(params.id);
  }

  @Put(':id')
  update(@Param() param: { id: string }, @Body() body: UpdateUserDto) {
    return this.userService.updateUser({ ...body, id: param.id });
  }
}
