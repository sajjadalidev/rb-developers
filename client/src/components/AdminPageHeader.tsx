import { Plus } from 'lucide-react';

export function AdminPageHeader({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="admin-page-head">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actionLabel && onAction ? (
        <button className="btn" onClick={onAction}><Plus size={18} /> {actionLabel}</button>
      ) : null}
    </div>
  );
}
