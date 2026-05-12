import { AdminGuard } from '@/components/AdminGuard';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="admin-shell">
        <AdminSidebar />
        <main className="admin-main">{children}</main>
      </div>
    </AdminGuard>
  );
}
