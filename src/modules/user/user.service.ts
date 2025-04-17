import { BadRequestException, Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { mapUser } from 'src/modules/user/mappers/map-user';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateAdminDto, CreateUserDto } from './dto/create-user.dto';
import { CryptoService } from 'src/services/crypto/crypto.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {}
  async createAdmin(createAdmin: CreateAdminDto) {
    const userExists = await this.prisma.user.findFirst({
      where: { email: createAdmin.email },
    });

    if (userExists) {
      throw new BadRequestException('User exists');
    }
    const createdUser = await this.prisma.user.create({
      data: {
        ...omit(createAdmin, ['confirmPassword', 'password']),
        password: await this.crypto.encrypt(createAdmin.password),
        role: 'admin',
      },
    });
    return omit(createdUser, ['password']);
  }

  async createUser(createUser: CreateUserDto) {
    const createdUser = await this.prisma.user.create({
      data: {
        ...createUser,
        role: 'user',
      },
    });
    return mapUser(createdUser);
  }

  async updateUser(updateUser: UpdateUserDto & { id: string }) {
    const result = await this.prisma.user.update({
      where: {
        id: updateUser.id,
      },
      data: updateUser,
    });
    return mapUser(result);
  }

  async findAllNonAdminUsers() {
    return mapUser(
      await this.prisma.user.findMany({
        where: {
          AND: {
            deletedAt: null,
            role: 'user',
          },
        },
      }),
    );
  }

  async deleteUser(id: string) {
    return mapUser(
      await this.prisma.user.update({
        data: {
          deletedAt: new Date(),
        },
        where: {
          id,
        },
      }),
    );
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
