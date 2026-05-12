import { PublicShell } from '@/components/PublicShell';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { LeadForm } from '@/components/LeadForm';
import { Building2, FileText, MapPinned, ShieldCheck } from 'lucide-react';

const projects = [
  ['NOC-approved housing projects', 'Verified documents, maps, payment plans, and availability.', ShieldCheck],
  ['Commercial towers', 'Office and shop inventory with floor plans and possession status.', Building2],
  ['Off-plan apartments', 'Installment schemes, booking flow, brochure, and launch offers.', FileText],
  ['Tourism and holiday homes', 'Murree and resort investment pages with rental yield guidance.', MapPinned],
  ['Farmhouses and villas', 'Lifestyle projects with amenities, maps, galleries, and site visits.', Building2],
  ['Installment schemes', 'Upcoming offers, registration, callback, and WhatsApp inquiry.', FileText]
];

export default function Projects() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Projects"
        title="Project showcase and booking flows"
        description="Launch pages for residential, commercial, off-plan, and tourism-led projects with the trust details buyers need."
      />
      <main className="section">
        <div className="container">
          <SectionHeader eyebrow="Inventory" title="Featured project categories" />
          <div className="grid">
            {projects.map(([title, description, Icon]: any) => <article className="card feature-card" key={title}><Icon /><h3>{title}</h3><p>{description}</p><a className="btn secondary" href="#lead">Register Interest</a></article>)}
          </div>
          <div style={{ marginTop: 28 }}><LeadForm interest="Project inquiry" /></div>
        </div>
      </main>
    </PublicShell>
  );
}
