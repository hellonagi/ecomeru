import { z } from 'zod'

export const schema = z.object({
  url: z
    .string()
    .trim()
    .regex(
      /^https:\/\/item\.rakuten\.co\.jp\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?.*$/,
      {
        message: '分析対象外のURLです。',
      }
    ),
})