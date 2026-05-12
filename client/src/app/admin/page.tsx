'use client';

import { useEffect, useState } from 'react';
import { api, authHeaders } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ properties: 0, sold: 0, leads: 0, offers: 0 });
  useEffect(() => {
    Promise.all([
      api('/properties'),
      api('/leads', { headers: authHeaders() }),
      api('/offers', { headers: authHeaders() })
    ]).then(([properties, leads, offers]) => setStats({
      properties: properties.length,
      sold: properties.filter((p: any) => p.status === 'sold').length,
      leads: leads.length,
      offers: offers.length
    })).catch(() => null);
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <div className="bands">
        <div className="band">Properties<br /><strong>{stats.properties}</strong></div>
        <div className="band">Sold<br /><strong>{stats.sold}</strong></div>
        <div className="band">Leads<br /><strong>{stats.leads}</strong></div>
        <div className="band">Offers<br /><strong>{stats.offers}</strong></div>
      </div>
    </>
  );
}
