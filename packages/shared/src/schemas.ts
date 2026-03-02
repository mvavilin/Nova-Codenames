import z from 'zod';

export const LoginDtoSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const RegisterDtoSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
});
