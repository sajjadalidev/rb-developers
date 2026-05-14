import { Nav } from "./Nav";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>NIKZN Real Estate & Developers</strong>
            <p>
              Verified properties, projects, file rates, and investment guidance
              for Pakistan real estate.
            </p>
          </div>
          <div>
            <span>Lahore</span>
            <span>Karachi</span>
            <span>Islamabad</span>
            <span>Murree</span>
          </div>
          <a
            className="btn gold"
            href="https://wa.me/923045595455"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </footer>
    </>
  );
}
