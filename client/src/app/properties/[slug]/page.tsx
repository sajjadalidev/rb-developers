import { LeadForm } from "@/components/LeadForm";
import { Nav } from "@/components/Nav";
import { api, Property } from "@/lib/api";

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property: Property = await api(`/properties/${slug}`);
  const image =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
  return (
    <>
      <Nav />
      <main>
        <section
          className="hero"
          style={{
            minHeight: 460,
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.72)), url(${image})`,
          }}
        >
          <div className="container hero-content">
            <span className={`tag ${property.status === "sold" ? "sold" : ""}`}>
              {property.status.toUpperCase()}
            </span>
            <h1>{property.title}</h1>
            <p>
              {property.area}, {property.city} - {property.size}{" "}
              {property.sizeUnit} - {property.priceLabel}
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container grid">
            <article>
              <span className="eyebrow">Property description</span>
              <h2>
                {property.priceLabel ||
                  `Rs. ${property.price.toLocaleString()}`}
              </h2>
              <p style={{ lineHeight: 1.7 }}>{property.description}</p>
              <h3>Key details</h3>
              <div className="bands">
                <div className="band">
                  Type
                  <br />
                  <strong>{property.category}</strong>
                </div>
                <div className="band">
                  Purpose
                  <br />
                  <strong>{property.purpose}</strong>
                </div>
                <div className="band">
                  Possession
                  <br />
                  <strong>{property.possession || "Ask agent"}</strong>
                </div>
                <div className="band">
                  NOC
                  <br />
                  <strong>
                    {property.nocApproved ? "Approved" : "Ask for docs"}
                  </strong>
                </div>
              </div>
              <h3>Amenities</h3>
              <p>{property.amenities?.join(" · ")}</p>
              <h3>Nearby</h3>
              <p>{property.nearby?.join(" · ")}</p>
            </article>
            <aside>
              <LeadForm propertyId={property._id} interest={property.title} />
              <div className="card card-body" style={{ marginTop: 16 }}>
                <strong>
                  {property.agent?.agency || "NIKZN Real Estate & Developers"}
                </strong>
                <span>{property.agent?.name}</span>
                <a
                  className="btn"
                  href={`https://wa.me/${property.agent?.whatsapp || "923000000000"}`}
                >
                  WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
