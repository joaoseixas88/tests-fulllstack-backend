import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  age: z.number().positive(),
  job: z.string(),
});

const createAdminSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export class CreateUserDto extends createZodDto(createUserSchema) {}

export class CreateAdminDto extends createZodDto(createAdminSchema) {}
