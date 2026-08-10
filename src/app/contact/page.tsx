import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Heart of Life Line Care Foundation in Ado Ekiti, Adebayo, Nigeria. Phone, email, and enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact Us</p>
          <h1>We would love to hear from you</h1>
          <p>
            Reach out for donations, volunteering, partnerships, or support
            services. We respond with care and confidentiality.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <div className="panel">
            <h2>Send a message</h2>
            <ContactForm />
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <strong>Phone</strong>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </div>
            <div className="contact-item">
              <strong>Email</strong>
              <a href={SITE.emailHref}>{SITE.email}</a>
            </div>
            <div className="contact-item">
              <strong>Address</strong>
              <span>{SITE.address}</span>
            </div>
            <iframe
              className="map-frame"
              title="Map of Ado Ekiti, Adebayo, Nigeria"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
