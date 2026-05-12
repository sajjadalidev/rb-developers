'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function OfferModal() {
  const [offer, setOffer] = useState<any>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    api('/offers?active=true').then((offers) => setOffer(offers?.[0])).catch(() => null);
  }, []);

  if (!offer || closed) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <span className="eyebrow">New scheme in {offer.area}</span>
        <h2>{offer.title}</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{offer.description}</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <a className="btn" href="#lead">{offer.ctaLabel}</a>
          <button className="btn secondary" onClick={() => setClosed(true)}>Close</button>
        </div>
      </div>
    </div>
  );
}
