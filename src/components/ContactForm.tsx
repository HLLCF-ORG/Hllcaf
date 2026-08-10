"use client";

import { FormEvent, useState } from "react";
import { SITE } from "@/lib/content";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      message,
    ].join("\n");

    window.location.href = `${SITE.emailHref}?subject=${encodeURIComponent(
      subject || "Website enquiry"
    )}&body=${encodeURIComponent(body)}`;

    setStatus("Opening your email app so you can send the message. Thank you for reaching out.");
    form.reset();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Name
          <input name="name" required placeholder="Your full name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="you@example.com" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone
          <input name="phone" type="tel" placeholder="+234..." />
        </label>
        <label>
          Subject
          <input name="subject" required placeholder="How can we help?" />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" required placeholder="Share your message..." />
      </label>
      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}
