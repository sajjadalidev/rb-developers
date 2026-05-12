import { Calculator, CheckCircle2, FileText, Map, ShieldCheck, TrendingUp } from 'lucide-react';
import { api, Property } from '@/lib/api';
import { PublicShell } from '@/components/PublicShell';
import { PropertyCard } from '@/components/PropertyCard';
import { OfferModal } from '@/components/OfferModal';
import { LeadForm } from '@/components/LeadForm';
import { SectionHeader } from '@/components/SectionHeader';
import { demoProperties } from '@/lib/demoData';

export default async function Home() {
  let properties: Property[] = [];
  try {
    properties = await api('/properties?featured=true');
  } catch {
    properties = demoProperties.filter((property) => property.isFeatured);
  }
  if (!properties.length) properties = demoProperties.filter((property) => property.isFeatured);

  return (
    <PublicShell>
      <OfferModal />
      <main>
        <section className="hero">
          <div className="container hero-content">
            <span className="eyebrow">Verified Pakistan Real Estate</span>
            <h1>Buy, sell, rent, and invest with clearer property data.</h1>
            <p>Explore verified listings, NOC-approved projects, file rates, maps, payment plans, agents, and investment tools in one place.</p>
            <form className="search-panel" action="/properties">
              <label className="field"><span>City</span><select className="select" name="city"><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Murree</option></select></label>
              <label className="field"><span>Purpose</span><select className="select" name="purpose"><option value="sale">Buy</option><option value="rent">Rent</option><option value="off-plan">Off Plan</option></select></label>
              <label className="field"><span>Type</span><select className="select" name="category"><option value="">All</option><option value="house">House</option><option value="apartment">Apartment</option><option value="plot">Plot</option><option value="commercial">Commercial</option></select></label>
              <label className="field"><span>Min Price</span><input className="input" name="minPrice" placeholder="PKR" /></label>
              <label className="field"><span>Max Price</span><input className="input" name="maxPrice" placeholder="PKR" /></label>
              <button className="btn">Search</button>
            </form>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="Featured" title="Fresh opportunities" action={<a className="btn secondary" href="/properties">View all</a>} />
            <div className="grid">{properties.map((p) => <PropertyCard key={p._id} property={p} />)}</div>
          </div>
        </section>

        <section className="section" style={{ background: '#fff' }}>
          <div className="container">
            <SectionHeader eyebrow="Platform" title="Everything buyers expect in Pakistan" />
            <div className="bands">
              <div className="band"><ShieldCheck /><h3>Verified listings</h3><p>NOC, phone, agent, status, and document checks.</p></div>
              <div className="band"><FileText /><h3>Payment plans</h3><p>Brochures, installment plans, possession status, and project docs.</p></div>
              <div className="band"><Map /><h3>Maps and areas</h3><p>DHA, Bahria, blocks, sectors, society maps, and nearby points.</p></div>
              <div className="band"><TrendingUp /><h3>Rates and trends</h3><p>Daily file rates, transfer fees, and area investment guidance.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container grid">
            <div>
              <span className="eyebrow">Services</span>
              <h2>From first search to transfer</h2>
              <p>Buy, rent, sell, off-plan booking, property management, valuation, agent discovery, and after-sales support.</p>
              <p><CheckCircle2 size={16} /> WhatsApp-first lead handling</p>
              <p><Calculator size={16} /> ROI, area unit, and installment tools</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
