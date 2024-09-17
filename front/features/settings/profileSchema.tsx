import { z } from 'zod'

export const schema = z.object({
  username: z
    .string()
    .trim()
    .min(1, {
      message: '表示名を入力してください。',
    })
    .max(16, {
      message: '16文字以内で入力してください。',
    }),
  nickname: z
    .string()
    .trim()
    .max(16, {
      message: '16文字以内で入力してください。',
    })
    .nullable(),
  bio: z
    .string()
    .trim()
    .max(140, {
      message: '140文字以内で入力してください。',
    })
    .nullable(),
  twitter: z
    .string()
    .trim()
    .max(32, {
      message: '32文字以内で入力してください。',
    })
    .nullable(),
})
