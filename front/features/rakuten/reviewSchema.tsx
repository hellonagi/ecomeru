import { z } from 'zod'

export const schema = z.object({
  description: z
    .string()
    .trim()
    .min(10, {
      message: '10文字以上で入力してください。',
    })
    .max(400, {
      message: '400文字以内で入力してください。',
    }),
  rating: z
    .number({
      invalid_type_error: '星を選択してください。',
    })
    .int('整数を入力してください。')
    .min(1, {
      message: '1以上の星を選択してください。',
    })
    .max(5, {
      message: '5以下の星を選択してください。',
    }),
  bought_date: z
    .date({
      invalid_type_error: '有効な日付を入力してください。',
    })
    .max(new Date(), {
      message: '現在より前の日付を入力してください。',
    }),
})
