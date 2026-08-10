import Image from "next/image";
import Link from "next/link";
import {
  IMPACT_STATS,
  MISSION,
  PROGRAMS,
  SITE,
  VISION,
} from "@/lib/content";

export default function HomePage() {
  const featured = PROGRAMS.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/images/hero-classroom.png"
            alt="Smiling African children learning together in a classroom"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <p className="eyebrow">{SITE.name}</p>
          <h1>{SITE.tagline}</h1>
          <p>
            We serve vulnerable communities through healthcare, education,
            empowerment, and humanitarian support — restoring dignity one life
            at a time.
          </p>
          <div className="hero-cta">
            <Link href="/get-involved" className="btn btn-gold">
              Donate Now
            </Link>
            <Link href="/get-involved#volunteer" className="btn btn-outline">
              Become a Volunteer
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="quote-block">
            <p className="eyebrow" style={{ color: "var(--gold-400)" }}>
              Our Vision
            </p>
            <h2>A compassionate society where every person can thrive</h2>
            <p>{VISION}</p>
          </div>

          <div className="stats">
            {IMPACT_STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="split-media">
            <Image
              src="/images/about-community.png"
              alt="Community health volunteers serving families during outreach"
              width={900}
              height={700}
            />
          </div>
          <div>
            <div className="section-head">
              <p className="eyebrow">Our Mission</p>
              <h2>Improving lives through care and partnership</h2>
            </div>
            <p>{MISSION.slice(0, 280)}...</p>
            <div className="hero-cta">
              <Link href="/about" className="btn btn-primary">
                About Us
              </Link>
              <Link href="/programs" className="btn btn-outline-dark">
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Programs & Services</p>
            <h2>Where compassion becomes action</h2>
            <p>
              Explore our core program areas supporting children, women, youth,
              seniors, and entire communities.
            </p>
          </div>
          <div className="program-grid three">
            {featured.map((program) => (
              <article className="program-card" key={program.id}>
                {program.image ? (
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={640}
                    height={400}
                  />
                ) : (
                  <div
                    style={{
                      height: 160,
                      background:
                        "linear-gradient(135deg, var(--green-100), var(--gold-100))",
                    }}
                  />
                )}
                <div className="program-card-body">
                  <h3>{program.title}</h3>
                  <p>{program.summary}</p>
                  <Link href={`/programs#${program.id}`} style={{ color: "var(--green-700)", fontWeight: 700 }}>
                    Learn more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <h2>Join us in restoring hope</h2>
            <p>
              Whether you give, volunteer, or partner with us, your support helps
              families in Ado Ekiti and beyond live with dignity.
            </p>
            <div className="hero-cta">
              <Link href="/get-involved" className="btn btn-gold">
                Get Involved
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
