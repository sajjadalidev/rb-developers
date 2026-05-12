'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function AdminLogout() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('rb_token');
    localStorage.removeItem('rb_user');
    router.replace('/login');
  }

  return (
    <button className="admin-logout" onClick={logout}>
      <LogOut size={18} />
      Logout
    </button>
  );
}
