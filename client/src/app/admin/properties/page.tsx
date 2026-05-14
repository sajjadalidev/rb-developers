"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit3, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { api, authHeaders } from "@/lib/api";
import { AdminPageHeader } from "@/components/AdminPageHeader";
import { AdminModal } from "@/components/AdminModal";
import { AdminEmptyState, AdminTableSkeleton } from "@/components/AdminStates";

const empty = {
  title: "",
  purpose: "sale",
  category: "house",
  status: "available",
  city: "",
  area: "",
  block: "",
  price: "",
  priceLabel: "",
  size: "",
  sizeUnit: "Marla",
  bedrooms: "",
  bathrooms: "",
  parking: "",
  possession: "",
  description: "",
  images: "",
  amenities: "",
  nearby: "",
  isFeatured: false,
  isVerified: true,
  nocApproved: false,
  agentName: "",
  agentPhone: "",
  agentWhatsapp: "",
};

function toForm(property: any) {
  return {
    ...empty,
    ...property,
    price: property.price || "",
    size: property.size || "",
    bedrooms: property.bedrooms || "",
    bathrooms: property.bathrooms || "",
    parking: property.parking || "",
    images: property.images?.join(", ") || "",
    amenities: property.amenities?.join(", ") || "",
    nearby: property.nearby?.join(", ") || "",
    agentName: property.agent?.name || "",
    agentPhone: property.agent?.phone || "",
    agentWhatsapp: property.agent?.whatsapp || "",
  };
}

function payload(form: any) {
  return {
    title: form.title,
    purpose: form.purpose,
    category: form.category,
    status: form.status,
    city: form.city,
    area: form.area,
    block: form.block,
    price: Number(form.price),
    priceLabel: form.priceLabel,
    size: Number(form.size),
    sizeUnit: form.sizeUnit,
    bedrooms: Number(form.bedrooms || 0),
    bathrooms: Number(form.bathrooms || 0),
    parking: Number(form.parking || 0),
    possession: form.possession,
    description: form.description,
    isFeatured: Boolean(form.isFeatured),
    isVerified: Boolean(form.isVerified),
    nocApproved: Boolean(form.nocApproved),
    images: String(form.images)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    amenities: String(form.amenities)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    nearby: String(form.nearby)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    agent: {
      name: form.agentName,
      phone: form.agentPhone,
      whatsapp: form.agentWhatsapp,
      agency: "NIKZN Real Estate & Developers",
    },
  };
}

export default function AdminProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      properties.filter((p) =>
        `${p.title} ${p.city} ${p.area}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [properties, query],
  );
  const load = async () => {
    setLoading(true);
    try {
      setProperties(await api("/properties"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  function addNew() {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  }

  function edit(property: any) {
    setEditing(property);
    setForm(toForm(property));
    setOpen(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api(editing ? `/properties/${editing._id}` : "/properties", {
        method: editing ? "PATCH" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload(form)),
      });
      setOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this property?")) return;
    await api(`/properties/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    await load();
  }

  async function markSold(property: any) {
    await api(`/properties/${property._id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({
        status: property.status === "sold" ? "available" : "sold",
      }),
    });
    await load();
  }

  return (
    <>
      <AdminPageHeader
        title="Properties"
        description="Manage sale, rent, off-plan, and commercial inventory."
        actionLabel="Add Property"
        onAction={addNew}
      />
      <div className="admin-toolbar">
        <input
          className="input"
          placeholder="Search title, city, area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn secondary" onClick={load}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>
      <div className="table-wrap">
        <table className="table admin-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <AdminTableSkeleton rows={5} columns={6} />
            ) : (
              filtered.map((p) => (
                <tr key={p._id}>
                  <td>
                    <strong>{p.title}</strong>
                    <br />
                    <span>
                      {p.size} {p.sizeUnit}
                    </span>
                  </td>
                  <td>
                    {p.area}, {p.city}
                  </td>
                  <td>
                    {p.purpose} / {p.category}
                  </td>
                  <td>
                    <span
                      className={`tag ${p.status === "sold" ? "sold" : ""}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.priceLabel ||
                      `Rs. ${Number(p.price || 0).toLocaleString()}`}
                  </td>
                  <td className="actions">
                    <button className="btn secondary" onClick={() => edit(p)}>
                      <Edit3 size={15} /> Edit
                    </button>
                    <button
                      className="btn secondary"
                      onClick={() => markSold(p)}
                    >
                      {p.status === "sold" ? "Available" : "Sold"}
                    </button>
                    <button
                      className="icon-danger"
                      onClick={() => remove(p._id)}
                      aria-label="Delete property"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!loading && !filtered.length && <AdminEmptyState columns={6} />}
          </tbody>
        </table>
      </div>

      {open && (
        <AdminModal
          title={editing ? "Edit property" : "Add property"}
          onClose={() => setOpen(false)}
        >
          <form onSubmit={save} className="admin-form">
            <div className="form-grid">
              <input
                className="input"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                className="input"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
              <input
                className="input"
                placeholder="Area / society"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                required
              />
              <input
                className="input"
                placeholder="Block / sector"
                value={form.block}
                onChange={(e) => setForm({ ...form, block: e.target.value })}
              />
              <input
                className="input"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                className="input"
                placeholder="Price label"
                value={form.priceLabel}
                onChange={(e) =>
                  setForm({ ...form, priceLabel: e.target.value })
                }
              />
              <input
                className="input"
                placeholder="Size"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                required
              />
              <select
                className="select"
                value={form.sizeUnit}
                onChange={(e) => setForm({ ...form, sizeUnit: e.target.value })}
              >
                <option>Marla</option>
                <option>Kanal</option>
                <option>SqFt</option>
                <option>SqYd</option>
              </select>
              <select
                className="select"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              >
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
                <option value="installment">Installment</option>
                <option value="off-plan">Off Plan</option>
              </select>
              <select
                className="select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
                <option value="office">Office</option>
                <option value="shop">Shop</option>
              </select>
              <select
                className="select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
                <option value="reserved">Reserved</option>
              </select>
              <input
                className="input"
                placeholder="Possession"
                value={form.possession}
                onChange={(e) =>
                  setForm({ ...form, possession: e.target.value })
                }
              />
              <input
                className="input"
                placeholder="Bedrooms"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              />
              <input
                className="input"
                placeholder="Bathrooms"
                value={form.bathrooms}
                onChange={(e) =>
                  setForm({ ...form, bathrooms: e.target.value })
                }
              />
              <input
                className="input"
                placeholder="Parking"
                value={form.parking}
                onChange={(e) => setForm({ ...form, parking: e.target.value })}
              />
              <input
                className="input"
                placeholder="Image URLs comma separated"
                value={form.images}
                onChange={(e) => setForm({ ...form, images: e.target.value })}
              />
              <input
                className="input"
                placeholder="Amenities comma separated"
                value={form.amenities}
                onChange={(e) =>
                  setForm({ ...form, amenities: e.target.value })
                }
              />
              <input
                className="input"
                placeholder="Nearby comma separated"
                value={form.nearby}
                onChange={(e) => setForm({ ...form, nearby: e.target.value })}
              />
              <input
                className="input"
                placeholder="Agent name"
                value={form.agentName}
                onChange={(e) =>
                  setForm({ ...form, agentName: e.target.value })
                }
              />
              <input
                className="input"
                placeholder="Agent phone"
                value={form.agentPhone}
                onChange={(e) =>
                  setForm({ ...form, agentPhone: e.target.value })
                }
              />
              <input
                className="input"
                placeholder="Agent WhatsApp"
                value={form.agentWhatsapp}
                onChange={(e) =>
                  setForm({ ...form, agentWhatsapp: e.target.value })
                }
              />
            </div>
            <textarea
              className="input"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
            <div className="check-row">
              <label>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                />{" "}
                Featured
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={form.isVerified}
                  onChange={(e) =>
                    setForm({ ...form, isVerified: e.target.checked })
                  }
                />{" "}
                Verified
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={form.nocApproved}
                  onChange={(e) =>
                    setForm({ ...form, nocApproved: e.target.checked })
                  }
                />{" "}
                NOC approved
              </label>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="btn" disabled={saving}>
                {saving ? <Loader2 className="spin" size={16} /> : null} Save
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
