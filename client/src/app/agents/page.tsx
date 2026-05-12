import { PublicShell } from '@/components/PublicShell';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { MessageCircle, ShieldCheck } from 'lucide-react';

const agents = [
  ['RB Lahore Office', 'Bahria Town, DHA, Lake City', '+92 321 1112508', '923211112508'],
  ['RB Karachi Office', 'Shahrah-e-Faisal, DHA City, Clifton', '+92 333 1524862', '923331524862'],
  ['Investor Desk', 'Overseas, Dubai, UK and off-plan projects', '+92 304 5595455', '923045595455']
];

export default function Agents() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Agents"
        title="Verified agency directory"
        description="Find city-wise consultants for buying, selling, renting, commercial inventory, files, and off-plan projects."
      />
      <main className="section">
        <div className="container">
          <form className="search-panel listing-search" style={{ marginBottom: 42 }}>
            <label className="field"><span>City</span><input className="input" placeholder="Lahore" /></label>
            <label className="field"><span>Location</span><input className="input" placeholder="DHA, Bahria, Clifton" /></label>
            <label className="field"><span>Agency</span><input className="input" placeholder="Company or agent name" /></label>
            <label className="field"><span>Service</span><select className="select"><option>Sale</option><option>Rent</option><option>Commercial</option></select></label>
            <button className="btn">Search</button>
          </form>
          <SectionHeader eyebrow="Directory" title="Available consultants" />
          <div className="grid">{agents.map(([name, areas, phone, whatsapp]) => <article className="card feature-card" key={name}><ShieldCheck /><span className="tag">VERIFIED</span><h3>{name}</h3><p>{areas}</p><a className="btn" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> {phone}</a></article>)}</div>
        </div>
      </main>
    </PublicShell>
  );
}
