import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateToken } from '@/features/auth/actions/validate-token'
import { checkRoles } from '@/features/auth/actions/check-roles'

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request

  const token = cookies.get('access-token')
  const client = cookies.get('client')
  const uid = cookies.get('uid')

  if (!token || !client || !uid) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const data = await checkRoles(token.value, client.value, uid.value)

  if (!data.is_validated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (nextUrl.pathname.startsWith('/auth/init')) {
    if (data.username) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    if (!data.username) {
      return NextResponse.redirect(new URL('/auth/init', request.url))
    }
  }

  if (nextUrl.pathname.startsWith('/admin')) {
    if (!data.is_admin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/auth/init'],
}
