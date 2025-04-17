import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { PrismaService } from '../../services/prisma/prisma.service';
import { UserService } from './user.service';

const makeAdmin = () => ({
  email: 'test@example.com',
  password: '123',
  confirmPassword: '123',
  name: 'Test',
});

const makeUser = () => ({
  name: 'User',
  surname: 'User',
  job: 'Developer',
  age: 25,
});

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAdmin', () => {
    it('should create and return an admin user without password', async () => {
      const admin = makeAdmin();
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      mockPrisma.user.create.mockResolvedValueOnce({
        id: 'new-id',
        email: admin.email,
        password: admin.password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createAdmin(admin);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: admin.email,
          password: admin.password,
          name: admin.name,
          role: 'admin',
        },
      });
      expect(result).not.toHaveProperty('password');
      expect(result).toHaveProperty('email', admin.email);
    });
  });

  describe('createUser', () => {
    it('should create and return a user without password', async () => {
      const user = makeUser();
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      mockPrisma.user.create.mockResolvedValueOnce({
        id: 'user-id',
        name: user.name,
        surname: user.surname,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createUser(makeUser());

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          name: user.name,
          surname: user.surname,
          age: user.age,
          job: user.job,
          role: 'user',
        },
      });
      expect(result).toHaveProperty('name', user.name);
    });
  });
});
