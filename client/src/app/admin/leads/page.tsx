'use client';

import { useEffect, useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { api, authHeaders } from '@/lib/api';
import { AdminModal } from '@/components/AdminModal';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { AdminEmptyState, AdminTableSkeleton } from '@/components/AdminStates';

const statuses = ['new', 'contacted', 'qualified', 'closed'];

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [status, setStatus] = useState('new');
  const [loading, setLoading] = useState(false);
  const load = async () => { setLoading(true); try { setLeads(await api('/leads', { headers: authHeaders() })); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    await api(`/leads/${editing._id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }) });
    setEditing(null);
    load();
  }
  async function remove(id: string) {
    if (!confirm('Delete this lead?')) return;
    await api(`/leads/${id}`, { method: 'DELETE', headers: authHeaders() });
    load();
  }
  return (
    <>
      <AdminPageHeader title="Leads" description="Track inquiries from public forms and property pages." />
      <div className="table-wrap"><table className="table admin-table"><thead><tr><th>Lead</th><th>Interest</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>{loading ? <AdminTableSkeleton rows={5} columns={5} /> : leads.map((l) => <tr key={l._id}><td><strong>{l.name}</strong><br /><span>{l.phone} {l.email ? `- ${l.email}` : ''}</span></td><td>{l.interest || l.property?.title || 'General inquiry'}</td><td><span className="tag">{l.status}</span></td><td>{new Date(l.createdAt).toLocaleDateString()}</td><td className="actions"><button className="btn secondary" onClick={() => { setEditing(l); setStatus(l.status); }}><Edit3 size={15} /> Status</button><button className="icon-danger" onClick={() => remove(l._id)}><Trash2 size={16} /></button></td></tr>)}{!loading && !leads.length && <AdminEmptyState columns={5} />}</tbody></table></div>
      {editing && <AdminModal title="Update lead status" onClose={() => setEditing(null)}><form onSubmit={save} className="admin-form"><p><strong>{editing.name}</strong><br />{editing.message || editing.interest}</p><select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>{statuses.map((item) => <option key={item} value={item}>{item}</option>)}</select><div className="modal-actions"><button type="button" className="btn secondary" onClick={() => setEditing(null)}>Cancel</button><button className="btn">Save</button></div></form></AdminModal>}
    </>
  );
}
