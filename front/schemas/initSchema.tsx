import { z } from 'zod'

export const schema = z.object({
  username: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9_]+$/,
      'Only lowercase letters, numbers, and underscores are allowed.',
    )
    .min(1, 'Must be at least 1 character long.')
    .max(16, 'Must be at most 16 characters long.'),
  nickname: z
    .string()
    .trim()
    .min(1, 'Must be at least 1 character long.')
    .max(10, 'Must be at most 10 characters long.'),
})
