"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre Mim" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/fotos", label: "Fotos" },
  { href: "/curriculo", label: "Currículo" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        🎀 Sofia Stradiotte 🎀
      </Link>

      <nav>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contato" className="btn-cta" onClick={() => setOpen(false)}>
              Vamos conversar! ✉
            </Link>
          </li>
        </ul>
      </nav>

      <button
        className="hamburger"
        aria-label="Abrir menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
