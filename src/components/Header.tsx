"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden>
            HL
          </span>
          <span className="brand-text">
            <strong>Heart of Life Line Care Foundation</strong>
            <span>{SITE.shortName}</span>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/get-involved" className="btn btn-gold">
            Donate Now
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>

      <div className={`container mobile-panel${open ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <div className="mobile-cta">
          <Link href="/get-involved" className="btn btn-gold" onClick={() => setOpen(false)}>
            Donate Now
          </Link>
          <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
