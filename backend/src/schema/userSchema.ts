import { z } from 'zod';

export const signUpSchema = z.object({
  fullname: z.string(),
  email: z.string().email('Invalid email format').trim().nonempty('Email is required'),
  password: z.string().trim().nonempty('Password is required'),
  username: z.string().trim().nonempty('Username is required'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email format').trim().nonempty('Email is required'),
  password: z.string().trim().nonempty('Password is required'),
});

export const searchQuerySchema = z.object({
  search: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: 'Search term should be alphabetic',
    })
    .optional(),
});
