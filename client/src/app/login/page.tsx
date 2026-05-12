'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Eye, EyeOff, Loader2, LockKeyhole, Mail } from 'lucide-react';
import { api } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError('');
    setLoading(true);
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: formData.get('email'), password: formData.get('password') })
      });
      localStorage.setItem('rb_token', data.token);
      localStorage.setItem('rb_user', JSON.stringify(data.user));
      router.push('/admin');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to login right now');
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span><Building2 size={26} /></span>
          <p className="eyebrow">Admin portal</p>
          <h1>Login</h1>
        </div>
        <form onSubmit={submit} className="login-form">
          <label className="input-shell">
            <Mail size={18} />
            <input name="email" type="email" placeholder="Email address" required />
          </label>
          <label className="input-shell">
            <LockKeyhole size={18} />
            <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" required />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>
          {error && <p className="login-error">{error}</p>}
          <button className="btn login-submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : null}
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
