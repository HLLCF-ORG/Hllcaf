import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Donate, volunteer, or partner with Heart of Life Line Care Foundation to support vulnerable communities.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Get Involved</p>
          <h1>Be part of the change</h1>
          <p>
            Your time, skills, and generosity help us deliver healthcare,
            education, empowerment, and emergency support where it is needed most.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container involve-grid">
          <article className="panel involve-card" id="donate">
            <p className="eyebrow">Donate</p>
            <h3>Give hope today</h3>
            <p>
              Every contribution supports medical outreach, school materials,
              food relief, and skills training for families in need.
            </p>
            <div className="bank-box">
              <strong>Donation details</strong>
              <p style={{ margin: "0.5rem 0 0" }}>
                Please contact us for bank transfer details or partnership
                giving options. We will guide you securely.
              </p>
              <p style={{ margin: "0.75rem 0 0" }}>
                Phone: <a href={SITE.phoneHref}>{SITE.phone}</a>
                <br />
                Email: <a href={SITE.emailHref}>{SITE.email}</a>
              </p>
            </div>
            <div className="hero-cta" style={{ marginTop: "1rem" }}>
              <Link href="/contact" className="btn btn-gold">
                Donate Now
              </Link>
            </div>
          </article>

          <article className="panel involve-card accent" id="volunteer">
            <p className="eyebrow">Volunteer</p>
            <h3>Become a volunteer</h3>
            <p>
              Join outreach teams, mentoring programs, skills workshops, and
              community sensitization campaigns. Training is provided.
            </p>
            <ul>
              <li>Healthcare and screening support</li>
              <li>Education and mentoring</li>
              <li>Logistics and community mobilization</li>
              <li>Professional skills and advocacy</li>
            </ul>
            <div className="hero-cta">
              <Link href="/membership" className="btn btn-primary">
                Membership Form
              </Link>
              <a href={SITE.membershipWhatsApp} className="btn btn-outline-dark" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </article>

          <article className="panel involve-card" id="partner">
            <p className="eyebrow">Partnerships</p>
            <h3>Partner with the Foundation</h3>
            <p>
              We welcome collaboration with government agencies, hospitals,
              schools, NGOs, and corporate CSR programs.
            </p>
            <p>
              Reach us at <a href={SITE.emailHref}>{SITE.email}</a> or visit our{" "}
              <Link href="/contact">Contact Us</Link> page to start a
              conversation.
            </p>
          </article>

          <article className="panel involve-card accent">
            <p className="eyebrow">Visit</p>
            <h3>Find us</h3>
            <p>{SITE.address}</p>
            <p>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
