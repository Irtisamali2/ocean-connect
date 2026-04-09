import crypto from 'crypto';

export const ADMIN_SESSION_COOKIE = 'oc_admin_session';

function getAuthSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_DASHBOARD_PASSWORD || 'change-me';
}

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);

  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function isAdminPasswordValid(password: string) {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (!expected) {
    throw new Error('Missing ADMIN_DASHBOARD_PASSWORD environment variable');
  }

  return timingSafeEqual(password, expected);
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24;
  const payload = String(expiresAt);
  const signature = crypto
    .createHmac('sha256', getAuthSecret())
    .update(payload)
    .digest('hex');

  return `${payload}.${signature}`;
}

export function isAdminSessionValid(token?: string) {
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expectedSig = crypto
    .createHmac('sha256', getAuthSecret())
    .update(payload)
    .digest('hex');

  if (!timingSafeEqual(signature, expectedSig)) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;

  return Date.now() < expiresAt;
}
