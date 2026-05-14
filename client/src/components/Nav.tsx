import Link from "next/link";
import { Building2, MessageCircle } from "lucide-react";

const whatsappUrl = "https://wa.me/923045595455";

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/">
          <Building2 size={22} /> NIKZN Real Estate & Developers
        </Link>
        <nav className="nav-links">
          <Link href="/properties">Properties</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/agents">Agents</Link>
          <Link href="/tools">Rates & Tools</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <a className="btn" href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </header>
  );
}
