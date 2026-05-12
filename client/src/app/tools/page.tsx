import { PublicShell } from '@/components/PublicShell';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { api } from '@/lib/api';
import { demoRates } from '@/lib/marketData';
import { Calculator, Landmark, MapPinned, RefreshCw } from 'lucide-react';

export default async function Tools() {
  let rates: any[] = [];
  let usingFallback = false;
  try { rates = await api('/market/rates'); } catch { usingFallback = true; rates = demoRates; }
  if (!rates.length) { usingFallback = true; rates = demoRates; }
  return (
    <PublicShell>
      <PageHero
        eyebrow="Market intelligence"
        title="File rates, calculators and fees"
        description="Track society file rates, transfer fees, map charges, and investor tools for Pakistan property decisions."
      />
      <main>
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="Tools" title="Buyer and investor utilities" />
            <div className="grid" style={{ marginBottom: 28 }}>
              <div className="card feature-card"><Calculator /><h3>Area unit converter</h3><p>Convert Marla, Kanal, SqFt, and SqYd for Pakistan property search.</p></div>
              <div className="card feature-card"><RefreshCw /><h3>Rental yield calculator</h3><p>Estimate annual return, net yield, and payback period before investing.</p></div>
              <div className="card feature-card"><Landmark /><h3>Transfer and map fees</h3><p>Publish DHA, Bahria, LDA, and society charges for buyers.</p></div>
            </div>
            <SectionHeader eyebrow={usingFallback ? 'Demo rates' : 'Live rates'} title="Latest file rates" />
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Project</th><th>Phase</th><th>Size</th><th>Rate</th><th>Updated</th></tr></thead>
                <tbody>{rates.map((r) => <tr key={r._id}><td>{r.project}</td><td>{r.phase}</td><td>{r.size}</td><td>{r.rate}</td><td>{new Date(r.updatedOn).toLocaleDateString()}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="info-strip">
              <MapPinned />
              <span>Admin can later add daily file rates, transfer fees, map fees, and society-specific updates from the backend.</span>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
