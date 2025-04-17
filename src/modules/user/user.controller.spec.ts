import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../services/prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;

  const mockPrisma = {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockUserService = {
    createUser: jest.fn(),
    createAdmin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
