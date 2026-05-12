import { PublicShell } from '@/components/PublicShell';
import { PropertyCard } from '@/components/PropertyCard';
import { api, Property } from '@/lib/api';
import { demoProperties } from '@/lib/demoData';
import { SectionHeader } from '@/components/SectionHeader';

function filterFallback(properties: Property[], params: Record<string, string>) {
  return properties.filter((property) => {
    if (params.city && property.city.toLowerCase() !== params.city.toLowerCase()) return false;
    if (params.area && !property.area.toLowerCase().includes(params.area.toLowerCase())) return false;
    if (params.purpose && property.purpose !== params.purpose) return false;
    if (params.category && property.category !== params.category) return false;
    if (params.maxPrice && property.price > Number(params.maxPrice)) return false;
    return true;
  });
}

export default async function Properties({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const query = new URLSearchParams(params).toString();
  let properties: Property[] = [];
  let usingFallback = false;
  try {
    properties = await api(`/properties?${query}`);
  } catch {
    usingFallback = true;
    properties = filterFallback(demoProperties, params);
  }
  if (!properties.length && !query) {
    properties = demoProperties;
    usingFallback = true;
  }
  return (
    <PublicShell>
      <main>
        <section className="listing-hero">
          <div className="container listing-hero-inner">
            <div>
              <span className="eyebrow">Listings</span>
              <h1>Properties for sale, rent and investment</h1>
              <p>Search verified homes, apartments, plots, commercial spaces, and off-plan projects across Pakistan.</p>
            </div>
          </div>
        </section>
        <section className="section listing-section">
        <div className="container">
          <form className="search-panel listing-search" action="/properties">
            <label className="field"><span>City</span><input className="input" name="city" placeholder="Lahore" defaultValue={params.city || ''} /></label>
            <label className="field"><span>Area / society</span><input className="input" name="area" placeholder="Bahria Town" defaultValue={params.area || ''} /></label>
            <label className="field"><span>Purpose</span><select className="select" name="purpose" defaultValue={params.purpose || ''}><option value="">Any purpose</option><option value="sale">Sale</option><option value="rent">Rent</option><option value="off-plan">Off Plan</option></select></label>
            <label className="field"><span>Type</span><select className="select" name="category" defaultValue={params.category || ''}><option value="">Any type</option><option value="house">House</option><option value="apartment">Apartment</option><option value="plot">Plot</option><option value="commercial">Commercial</option><option value="office">Office</option></select></label>
            <label className="field"><span>Max price</span><input className="input" name="maxPrice" placeholder="PKR" defaultValue={params.maxPrice || ''} /></label>
            <button className="btn">Apply</button>
          </form>
          <SectionHeader eyebrow={usingFallback ? 'Demo data' : 'Live inventory'} title={`${properties.length} matching properties`} />
          {properties.length ? (
            <div className="grid">{properties.map((p) => <PropertyCard key={p._id} property={p} />)}</div>
          ) : (
            <div className="empty-state">
              <h2>No matching properties found</h2>
              <p>Try a wider city, purpose, or price filter. New listings can also be added from the admin portal.</p>
            </div>
          )}
        </div>
        </section>
      </main>
    </PublicShell>
  );
}
