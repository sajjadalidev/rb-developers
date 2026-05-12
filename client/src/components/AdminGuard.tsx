'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    const hasToken = Boolean(localStorage.getItem('rb_token'));
    setAuthed(hasToken);
    setReady(true);
    if (!hasToken) router.replace('/login');
  }, []);
  if (!ready) return null;
  if (!authed) return null;
  return children;
}
