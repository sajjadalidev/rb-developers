export function SectionHeader({
  eyebrow,
  title,
  action
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}
