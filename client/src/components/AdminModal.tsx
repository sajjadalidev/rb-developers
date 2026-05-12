'use client';

import { X } from 'lucide-react';

export function AdminModal({
  title,
  children,
  onClose
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal">
        <header>
          <h2>{title}</h2>
          <button className="icon-only" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </header>
        {children}
      </section>
    </div>
  );
}
