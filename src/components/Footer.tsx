import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{SITE.name}</h3>
          <p>
            Building healthier communities through healthcare, education,
            empowerment, and compassionate service.
          </p>
          <div className="socials" aria-label="Social media">
            <a href={SITE.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
              f
            </a>
            <a href={SITE.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
              IG
            </a>
            <a href={SITE.social.twitter} aria-label="X / Twitter" target="_blank" rel="noreferrer">
              X
            </a>
            <a href={SITE.social.whatsapp} aria-label="WhatsApp" target="_blank" rel="noreferrer">
              Wa
            </a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
          <p>
            <a href={SITE.emailHref}>{SITE.email}</a>
          </p>
          <p>{SITE.address}</p>
        </div>

        <div>
          <h3>Stay Connected</h3>
          <p>Subscribe for outreach updates and volunteer opportunities.</p>
          <form className="newsletter" action={`mailto:${SITE.email}`} method="post" encType="text/plain">
            <input type="email" name="email" placeholder="Your email" required aria-label="Email" />
            <button type="submit" className="btn btn-gold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved, 2026.</span>
        <span>Serving communities with hope, dignity, and compassion.</span>
      </div>
    </footer>
  );
}
