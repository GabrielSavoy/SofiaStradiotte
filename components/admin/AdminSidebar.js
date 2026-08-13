"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";

const LINKS = [
  { href: "/admin/dashboard", label: "Início", exact: true },
  { href: "/admin/dashboard/inicio", label: "Página Inicial" },
  { href: "/admin/dashboard/sobre", label: "Sobre Mim" },
  { href: "/admin/dashboard/portfolio", label: "Portfólio" },
  { href: "/admin/dashboard/fotos", label: "Fotos" },
  { href: "/admin/dashboard/curriculo", label: "Currículo" },
  { href: "/admin/dashboard/contato", label: "Contato" },
  { href: "/admin/dashboard/configuracoes", label: "Configurações" },
];

export default function AdminSidebar({ userEmail }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (link) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href);

  return (
    <>
      <div className="admin-topbar">
        <span className="logo" style={{ fontSize: "1.3rem" }}>🎀 Sofia</span>
        <button className="btn-secondary btn-sm" onClick={() => setOpen((v) => !v)}>
          {open ? "Fechar" : "Menu"}
        </button>
      </div>

      <aside className={`admin-sidebar${open ? " open" : ""}`}>
        <div className="logo">🎀 Sofia Stradiotte</div>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-nav-link${isActive(link) ? " active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="signout">
          <p className="field-hint" style={{ marginBottom: 8 }}>{userEmail}</p>
          <form action={logout}>
            <button type="submit" className="btn-secondary btn-sm" style={{ width: "100%" }}>
              Sair
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
