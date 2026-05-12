'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { api } from '@/lib/api';

export function LeadForm({ propertyId, interest = 'General inquiry' }: { propertyId?: string; interest?: string }) {
  const [sent, setSent] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await api('/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message'),
        interest,
        property: propertyId
      })
    });
    setSent(true);
  }
  if (sent) return <div className="card card-body"><strong>Thanks. Our consultant will contact you shortly.</strong></div>;
  return (
    <form id="lead" onSubmit={submit} className="card card-body">
      <span className="eyebrow">Free consultation</span>
      <input className="input" name="name" placeholder="Name" required />
      <input className="input" name="phone" placeholder="Phone / WhatsApp" required />
      <input className="input" name="email" placeholder="Email" />
      <textarea className="input" name="message" placeholder="Tell us your budget, city, and property need" rows={4} />
      <button className="btn"><Send size={16} /> Send inquiry</button>
    </form>
  );
}
