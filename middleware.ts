// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './next-i18next.config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale

  // Eğer kök dizine (/ ) girilirse, varsayılan dile yönlendir
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return NextResponse.next()
}

// Middleware'in hangi yolları kontrol edeceğini belirtin
export const config = {
  matcher: ['/', '/(tr|en)/:path*'], // Sadece /, /tr/* ve /en/* için çalışır
}