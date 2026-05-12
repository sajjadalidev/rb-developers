import { FolderOpen } from 'lucide-react';

export function AdminTableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <tr key={row}>
          {Array.from({ length: columns }).map((__, column) => (
            <td key={column}>
              <span className="skeleton-line" style={{ width: column === 0 ? '72%' : '52%' }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function AdminEmptyState({ columns }: { columns: number }) {
  return (
    <tr>
      <td colSpan={columns}>
        <div className="admin-empty">
          <span><FolderOpen size={34} /></span>
          <strong>No records exist in the system</strong>
          <p>New records will appear here as soon as you add or receive them.</p>
        </div>
      </td>
    </tr>
  );
}
