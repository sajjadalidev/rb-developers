import Link from 'next/link';
import { Bath, BedDouble, Car, MapPin, Ruler } from 'lucide-react';
import type { Property } from '@/lib/api';

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa';
  return (
    <article className="card">
      <div className="property-img" style={{ backgroundImage: `url(${image})` }}>
        <div style={{ position: 'absolute', left: 12, top: 12, display: 'flex', gap: 8 }}>
          <span className={`tag ${property.status === 'sold' ? 'sold' : ''}`}>{property.status.toUpperCase()}</span>
          {property.isVerified && <span className="tag">VERIFIED</span>}
        </div>
      </div>
      <div className="card-body">
        <div className="price">{property.priceLabel || `Rs. ${property.price.toLocaleString()}`}</div>
        <Link href={`/properties/${property.slug}`}><strong>{property.title}</strong></Link>
        <div className="meta"><MapPin size={14} /> {property.area}, {property.city}</div>
        <div className="meta">
          <span><Ruler size={14} /> {property.size} {property.sizeUnit}</span>
          {property.bedrooms ? <span><BedDouble size={14} /> {property.bedrooms}</span> : null}
          {property.bathrooms ? <span><Bath size={14} /> {property.bathrooms}</span> : null}
          {property.parking ? <span><Car size={14} /> {property.parking}</span> : null}
        </div>
      </div>
    </article>
  );
}
