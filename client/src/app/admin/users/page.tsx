'use client';

import { useEffect, useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { api, authHeaders } from '@/lib/api';
import { AdminModal } from '@/components/AdminModal';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { AdminEmptyState, AdminTableSkeleton } from '@/components/AdminStates';

const empty = { name: '', email: '', phone: '', role: 'manager', password: '', isActive: true };

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const load = async () => { setLoading(true); try { setUsers(await api('/users', { headers: authHeaders() })); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  function addNew() { setEditing(null); setForm(empty); setOpen(true); }
  function edit(user: any) { setEditing(user); setForm({ ...empty, ...user, password: '' }); setOpen(true); }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    const body = { ...form };
    if (editing && !body.password) delete body.password;
    await api(editing ? `/users/${editing._id}` : '/users', { method: editing ? 'PATCH' : 'POST', headers: authHeaders(), body: JSON.stringify(body) });
    setOpen(false);
    load();
  }
  async function remove(id: string) {
    if (!confirm('Delete this user?')) return;
    await api(`/users/${id}`, { method: 'DELETE', headers: authHeaders() });
    load();
  }
  return (
    <>
      <AdminPageHeader title="Users" description="Create admins and managers for the portal." actionLabel="Add User" onAction={addNew} />
      <div className="table-wrap"><table className="table admin-table"><thead><tr><th>User</th><th>Phone</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{loading ? <AdminTableSkeleton rows={5} columns={5} /> : users.map((u) => <tr key={u._id}><td><strong>{u.name}</strong><br /><span>{u.email}</span></td><td>{u.phone}</td><td>{u.role}</td><td><span className="tag">{u.isActive ? 'Active' : 'Inactive'}</span></td><td className="actions"><button className="btn secondary" onClick={() => edit(u)}><Edit3 size={15} /> Edit</button><button className="icon-danger" onClick={() => remove(u._id)}><Trash2 size={16} /></button></td></tr>)}{!loading && !users.length && <AdminEmptyState columns={5} />}</tbody></table></div>
      {open && <AdminModal title={editing ? 'Edit user' : 'Add user'} onClose={() => setOpen(false)}><form onSubmit={save} className="admin-form"><div className="form-grid"><input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /><input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /><input className="input" placeholder="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><input className="input" placeholder={editing ? 'New password optional' : 'Password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editing} /><select className="select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="manager">Manager</option><option value="admin">Admin</option></select></div><label className="check-row"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active user</label><div className="modal-actions"><button type="button" className="btn secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn">Save</button></div></form></AdminModal>}
    </>
  );
}
