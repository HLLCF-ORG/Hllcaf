import type { Metadata } from "next";
import Image from "next/image";
import { HISTORY, MISSION, VISION } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vision, mission, and history of Heart of Life Line Care Foundation — building hope and dignity in underserved communities.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">About Us</p>
          <h1>Who we are</h1>
          <p>
            Heart of Life Line Care Foundation exists to restore hope, promote
            dignity, and empower people to achieve sustainable livelihoods.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container vision-mission">
          <article className="panel accent">
            <p className="eyebrow">Vision Statement</p>
            <h2>What we aspire to</h2>
            <p>{VISION}</p>
          </article>
          <article className="panel">
            <p className="eyebrow">Mission Statement</p>
            <h2>What we do</h2>
            <p>{MISSION}</p>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="split-media">
            <Image
              src="/images/about-community.png"
              alt="Volunteers warmly interacting with community members"
              width={900}
              height={700}
            />
          </div>
          <div className="history-block">
            <p className="eyebrow">Our History</p>
            <h2>History of Heart of Life Line Care Foundation</h2>
            {HISTORY.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
