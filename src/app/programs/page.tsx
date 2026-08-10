import type { Metadata } from "next";
import Image from "next/image";
import { PROGRAMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs & Services",
  description:
    "Explore healthcare, education, youth and women empowerment, humanitarian aid, and community development programs.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Programs & Services</p>
          <h1>How we serve communities</h1>
          <p>
            Ten program areas designed to meet the needs of children, women,
            youth, seniors, and entire communities with dignity and care.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container program-grid">
          {PROGRAMS.map((program) => (
            <article className="program-card" id={program.id} key={program.id}>
              {program.image ? (
                <Image
                  src={program.image}
                  alt={program.title}
                  width={800}
                  height={480}
                />
              ) : null}
              <div className="program-card-body">
                <h2 style={{ fontSize: "1.25rem" }}>{program.title}</h2>
                <p>{program.summary}</p>
                <ul>
                  {program.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
