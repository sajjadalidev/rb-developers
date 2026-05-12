'use client';

import { useEffect, useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { api, authHeaders } from '@/lib/api';
import { AdminModal } from '@/components/AdminModal';
import { AdminPageHeader } from '@/components/AdminPageHeader';
import { AdminEmptyState, AdminTableSkeleton } from '@/components/AdminStates';

const empty = { title: '', city: '', area: '', description: '', ctaLabel: 'Register Interest', isActive: true };

export default function AdminOffers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const load = async () => { setLoading(true); try { setOffers(await api('/offers', { headers: authHeaders() })); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  function addNew() { setEditing(null); setForm(empty); setOpen(true); }
  function edit(offer: any) { setEditing(offer); setForm({ ...empty, ...offer }); setOpen(true); }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    await api(editing ? `/offers/${editing._id}` : '/offers', { method: editing ? 'PATCH' : 'POST', headers: authHeaders(), body: JSON.stringify(form) });
    setOpen(false);
    load();
  }
  async function remove(id: string) {
    if (!confirm('Delete this offer?')) return;
    await api(`/offers/${id}`, { method: 'DELETE', headers: authHeaders() });
    load();
  }
  async function toggle(offer: any) {
    await api(`/offers/${offer._id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ isActive: !offer.isActive }) });
    load();
  }

  return (
    <>
      <AdminPageHeader title="Offers" description="Manage public popup schemes and upcoming area offers." actionLabel="Add Offer" onAction={addNew} />
      <div className="table-wrap">
        <table className="table admin-table">
          <thead><tr><th>Offer</th><th>Area</th><th>CTA</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{loading ? <AdminTableSkeleton rows={5} columns={5} /> : offers.map((o) => <tr key={o._id}><td><strong>{o.title}</strong><br /><span>{o.description}</span></td><td>{o.area}, {o.city}</td><td>{o.ctaLabel}</td><td><span className="tag">{o.isActive ? 'Active' : 'Paused'}</span></td><td className="actions"><button className="btn secondary" onClick={() => edit(o)}><Edit3 size={15} /> Edit</button><button className="btn secondary" onClick={() => toggle(o)}>{o.isActive ? 'Pause' : 'Activate'}</button><button className="icon-danger" onClick={() => remove(o._id)}><Trash2 size={16} /></button></td></tr>)}{!loading && !offers.length && <AdminEmptyState columns={5} />}</tbody>
        </table>
      </div>
      {open && <AdminModal title={editing ? 'Edit offer' : 'Add offer'} onClose={() => setOpen(false)}>
        <form onSubmit={save} className="admin-form">
          <div className="form-grid">
            <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <input className="input" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            <input className="input" placeholder="Area" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} required />
            <input className="input" placeholder="CTA label" value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} required />
          </div>
          <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <label className="check-row"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active offer</label>
          <div className="modal-actions"><button type="button" className="btn secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn">Save</button></div>
        </form>
      </AdminModal>}
    </>
  );
}
