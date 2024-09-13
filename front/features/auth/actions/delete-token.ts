'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function deleteToken() {
  const cookiesList = cookies()
  cookiesList.delete('access-token')
  cookiesList.delete('uid')
  cookiesList.delete('client')

  revalidatePath('/')
}
