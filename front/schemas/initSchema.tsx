import { z } from 'zod'

export const schema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^[a-z0-9_]+$/, '英小文字、数字、アンダーバーのみ使用できます。')
    .min(1, '1文字以上でなければなりません。')
    .max(16, '16文字以下でなければなりません。'),
  nickname: z
    .string()
    .trim()
    .min(1, '1文字以上でなければなりません。')
    .max(10, '10文字以下でなければなりません。'),
})
