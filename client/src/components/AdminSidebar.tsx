"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  BadgePercent,
  Building2,
  Home,
  LayoutDashboard,
  Menu,
  Users,
  UserRoundCheck,
  X,
} from "lucide-react";
import { AdminLogout } from "./AdminLogout";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/offers", label: "Offers", icon: BadgePercent },
  { href: "/admin/leads", label: "Leads", icon: UserRoundCheck },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/", label: "Public site", icon: Home },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="admin-menu-btn"
        onClick={() => setOpen(true)}
        aria-label="Open admin navigation"
      >
        <Menu size={22} />
      </button>
      <button
        className={`admin-sidebar-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
        aria-label="Close navigation"
      />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <strong>NIKZN Admin</strong>
          <button
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close admin navigation"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : href === "/admin"
                  ? pathname === href
                  : pathname.startsWith(href);
            return (
              <Link
                href={href}
                key={href}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-brand">
          <strong>NIKZN Admin</strong>
        </div>
        <AdminLogout />
      </aside>
    </>
  );
}
