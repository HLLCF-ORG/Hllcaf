import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";
import MembershipForm from "@/components/MembershipForm";

export const metadata: Metadata = {
  title: "Membership Registration",
  description:
    "Register as a member of Heart of Life Line Care Foundation (HLLCAF) to join our humanitarian outreach, health programs, and community empowerment initiatives.",
};

export default function MembershipPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Join the Family</p>
          <h1>Membership Registration</h1>
          <p>
            Become part of Heart of Life Line Care Foundation (HLLCAF). Together,
            we touch lives, restore hope, and build healthier, more resilient communities.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container membership-grid">
          {/* Main Form Column */}
          <div className="membership-form-container">
            <div className="panel form-panel">
              <div className="panel-header">
                <h2>Member Information Form</h2>
                <p>
                  Please fill out the registration form below. Required fields are marked with an asterisk (<span className="req">*</span>).
                </p>
              </div>
              <MembershipForm />
            </div>
          </div>

          {/* Sidebar / Information Column */}
          <aside className="membership-sidebar">
            <div className="panel accent sidebar-card">
              <p className="eyebrow">Why Join HLLCAF?</p>
              <h3>Be a Lifeline of Hope</h3>
              <p>
                As an HLLCAF member, you are directly supporting sustainable community
                solutions across healthcare, education, and human empowerment.
              </p>
              <ul className="benefit-list">
                <li>
                  <strong>Community Impact:</strong> Participate in medical outreaches,
                  educational support, and emergency relief programs.
                </li>
                <li>
                  <strong>Growth & Training:</strong> Gain valuable experience in
                  non-profit management, community health, and leadership.
                </li>
                <li>
                  <strong>Active Network:</strong> Connect with dedicated professionals,
                  youth advocates, and community leaders.
                </li>
              </ul>
            </div>

            <div className="panel sidebar-card">
              <p className="eyebrow">NGO Compliance & Privacy</p>
              <h3>Data Protection Pledge</h3>
              <p>
                Heart of Life Line Care Foundation operates under strict non-profit
                governance and ethical data standards.
              </p>
              <div className="security-badges">
                <div className="security-badge-item">
                  <span className="badge-icon">🛡️</span>
                  <div>
                    <strong>Confidential Storage</strong>
                    <span>Your data is encrypted and accessible only to authorized NGO coordinators.</span>
                  </div>
                </div>
                <div className="security-badge-item">
                  <span className="badge-icon">📜</span>
                  <div>
                    <strong>NDPA / NDPR Compliant</strong>
                    <span>We strictly adhere to Nigerian data protection laws. No third-party sharing.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel sidebar-card help-card">
              <p className="eyebrow">Assistance & Inquiries</p>
              <h3>Need Help Registering?</h3>
              <p>
                Our membership desk is here to assist you with any questions or offline registration.
              </p>
              <div className="sidebar-contact">
                <p>
                  <strong>Membership Desk:</strong>{" "}
                  <a href={`tel:${SITE.membershipPhone}`}>{SITE.membershipPhone}</a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={SITE.membershipWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp ({SITE.membershipPhone})
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={SITE.emailHref}>{SITE.email}</a>
                </p>
                <p>
                  <strong>Location:</strong> {SITE.address}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
