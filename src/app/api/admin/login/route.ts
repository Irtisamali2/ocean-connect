import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, isAdminPasswordValid } from '@/lib/admin-auth';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request payload' }, { status: 400 });
  }

  if (!process.env.ADMIN_DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: 'Server admin password is not configured' },
      { status: 500 },
    );
  }

  try {
    const password = (typeof (body as { password?: unknown })?.password === 'string'
      ? (body as { password: string }).password
      : '').trim();

    if (!password || !isAdminPasswordValid(password)) {
      return NextResponse.json({ ok: false, message: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: createAdminSessionToken(),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json({ ok: false, message: 'Unable to login right now' }, { status: 500 });
  }
}
