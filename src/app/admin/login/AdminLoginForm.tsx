'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError('Unable to login right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="admin-password">Password</label>
      <input
        id="admin-password"
        type="password"
        className="form-input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error ? <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: 10 }}>{error}</p> : null}
      <button
        type="submit"
        className="btn-primary"
        disabled={isSubmitting}
        style={{ marginTop: 18, width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.8 : 1 }}
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
