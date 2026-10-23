"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { SITE } from "@/lib/content";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Diaspora / International",
];

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  state: string;
  city: string;
  address: string;
  occupation: string;
  reason: string;
  consent: boolean;
}

const initialFormState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  gender: "",
  state: "Ekiti",
  city: "",
  address: "",
  occupation: "",
  reason: "",
  consent: false,
};

const PHOTO_BUCKET = "member-photos";
const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_PHOTO_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export default function MembershipForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  // Release the preview object URL when it changes or the component unmounts
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoError("");
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (!file) {
      clearPhoto();
      return;
    }
    if (!ALLOWED_PHOTO_TYPES[file.type]) {
      clearPhoto();
      setPhotoError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      clearPhoto();
      setPhotoError("Image is too large. Maximum size is 2MB.");
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!formData.city.trim()) {
      setErrorMessage("Please enter your city or town.");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please accept the NGO data privacy consent to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload passport photograph (optional) to the private storage bucket
      let photoPath: string | null = null;
      if (photoFile) {
        const ext = ALLOWED_PHOTO_TYPES[photoFile.type];
        photoPath = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(PHOTO_BUCKET)
          .upload(photoPath, photoFile, {
            contentType: photoFile.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Photo upload error:", uploadError);
          setErrorMessage(
            "We couldn't upload your photo. Please try a different image, or remove the photo and submit without it."
          );
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Save member record
      const { error } = await supabase.from("members").insert([
        {
          photo_path: photoPath,
          full_name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          gender: formData.gender || null,
          state: formData.state,
          city: formData.city.trim(),
          address: formData.address.trim() || null,
          occupation: formData.occupation.trim() || null,
          reason: formData.reason.trim() || null,
          consent_agreed: true,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        // If table doesn't exist yet, guide user gracefully
        if (error.code === "PGRST205" || error.message?.includes("schema cache")) {
          setErrorMessage(
            "The database table 'members' is awaiting setup in your Supabase SQL editor. You can still confirm your registration directly via WhatsApp below!"
          );
        } else {
          setErrorMessage(
            error.message || "Failed to submit registration. Please try again or reach out on WhatsApp."
          );
        }
        setIsSubmitting(false);
        return;
      }

      setSubmittedData({ ...formData });
      setIsSubmitting(false);
      // Keep the preview for the success screen; drop the file reference
      setPhotoFile(null);
    } catch (err: unknown) {
      console.error("Submission exception:", err);
      setErrorMessage(
        "A network connection error occurred. Please verify your internet connection or use WhatsApp."
      );
      setIsSubmitting(false);
    }
  };

  // Build formatted WhatsApp message
  const getWhatsAppUrl = (data: FormState) => {
    const text = [
      `*New Member Registration - HLLCAF*`,
      `*Full Name:* ${data.fullName}`,
      `*Phone:* ${data.phone}`,
      `*Email:* ${data.email}`,
      `*Location:* ${data.city}, ${data.state}`,
      data.occupation ? `*Occupation:* ${data.occupation}` : "",
      data.reason ? `*Motivation:* ${data.reason}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/2349063563870?text=${encodeURIComponent(text)}`;
  };

  if (submittedData) {
    return (
      <div className="panel accent membership-success-card">
        <div className="success-icon" aria-hidden="true">✓</div>
        <h2>Registration Successful!</h2>
        <p className="success-lead">
          Thank you, <strong>{submittedData.fullName}</strong>. Your membership registration
          has been securely recorded in the Heart of Life Line Care Foundation database.
        </p>

        <div className="member-summary-box">
          {photoPreview ? (
            <div className="summary-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="Your passport photograph" />
            </div>
          ) : null}
          <div className="summary-row">
            <span>Full Name:</span>
            <strong>{submittedData.fullName}</strong>
          </div>
          <div className="summary-row">
            <span>Phone:</span>
            <strong>{submittedData.phone}</strong>
          </div>
          <div className="summary-row">
            <span>Email:</span>
            <strong>{submittedData.email}</strong>
          </div>
          <div className="summary-row">
            <span>State / City:</span>
            <strong>{submittedData.city}, {submittedData.state}</strong>
          </div>
          {submittedData.occupation ? (
            <div className="summary-row">
              <span>Occupation:</span>
              <strong>{submittedData.occupation}</strong>
            </div>
          ) : null}
        </div>

        <div className="whatsapp-prompt-box">
          <h3>Stay Connected with HLLCAF</h3>
          <p>
            Connect directly with our membership coordinator on WhatsApp to receive
            immediate welcome info, upcoming outreach dates, and community announcements.
          </p>
          <a
            href={getWhatsAppUrl(submittedData)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Connect on WhatsApp (09063563870)
          </a>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              setSubmittedData(null);
              setFormData(initialFormState);
              clearPhoto();
            }}
          >
            Register Another Member
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form membership-form" onSubmit={handleSubmit}>
      {errorMessage ? (
        <div className="form-alert error" role="alert">
          <p>{errorMessage}</p>
          {errorMessage.includes("WhatsApp") ? (
            <a
              href={getWhatsAppUrl(formData)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ marginTop: "0.5rem" }}
            >
              Send via WhatsApp Instead (09063563870)
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="form-section-header">
        <h4>1. Personal Information</h4>
        <p>Please provide your basic contact details.</p>
      </div>

      <div className="form-row">
        <label>
          <span className="label-text">
            Full Name <span className="req">*</span>
          </span>
          <input
            name="fullName"
            type="text"
            required
            placeholder="e.g. Adeola Adeleke"
            value={formData.fullName}
            onChange={handleChange}
          />
        </label>
        <label>
          <span className="label-text">Gender</span>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          <span className="label-text">
            Phone Number <span className="req">*</span>
          </span>
          <input
            name="phone"
            type="tel"
            required
            placeholder="e.g. 08012345678"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          <span className="label-text">
            Email Address <span className="req">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            placeholder="e.g. name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="photo-upload">
        <span className="label-text">
          Passport Photograph <span className="optional-tag">(optional)</span>
        </span>
        <div className="photo-upload-body">
          <div className="photo-preview" aria-hidden={!photoPreview}>
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="Selected passport photograph preview" />
            ) : (
              <span className="photo-placeholder" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </span>
            )}
          </div>
          <div className="photo-upload-actions">
            <label className="btn btn-outline-dark photo-pick-btn">
              {photoFile ? "Change Photo" : "Upload Photo"}
              <input
                ref={photoInputRef}
                type="file"
                name="photo"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className="visually-hidden"
              />
            </label>
            {photoFile ? (
              <button type="button" className="photo-remove-btn" onClick={clearPhoto}>
                Remove
              </button>
            ) : null}
            <p className="photo-hint">
              {photoFile
                ? photoFile.name
                : "Clear, recent passport-style photo. JPG, PNG or WEBP, max 2MB."}
            </p>
            {photoError ? (
              <p className="photo-error" role="alert">
                {photoError}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="form-section-header" style={{ marginTop: "1rem" }}>
        <h4>2. Location & Residence</h4>
        <p>Helps us organize regional outreaches and volunteer groups.</p>
      </div>

      <div className="form-row">
        <label>
          <span className="label-text">
            State of Residence <span className="req">*</span>
          </span>
          <select name="state" value={formData.state} onChange={handleChange} required>
            {NIGERIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="label-text">
            City / Town <span className="req">*</span>
          </span>
          <input
            name="city"
            type="text"
            required
            placeholder="e.g. Ado-Ekiti, Ikere, Ikeja"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
      </div>

      <label>
        <span className="label-text">Residential / Contact Address</span>
        <input
          name="address"
          type="text"
          placeholder="e.g. Adebayo Area, Ado-Ekiti"
          value={formData.address}
          onChange={handleChange}
        />
      </label>

      <div className="form-section-header" style={{ marginTop: "1rem" }}>
        <h4>3. Background & Interest</h4>
        <p>Tell us a bit about yourself and what drives you.</p>
      </div>

      <label>
        <span className="label-text">Occupation / Profession</span>
        <input
          name="occupation"
          type="text"
          placeholder="e.g. Healthcare Worker, Educator, Student, Civil Servant, Trader"
          value={formData.occupation}
          onChange={handleChange}
        />
      </label>

      <label>
        <span className="label-text">Why would you like to join HLLCAF?</span>
        <textarea
          name="reason"
          placeholder="Share your motivation, special skills, or how you would like to participate in Foundation outreach..."
          value={formData.reason}
          onChange={handleChange}
          rows={3}
        />
      </label>

      <div className="consent-box">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          <span>
            <strong>NGO Data Privacy & Compliance Agreement:</strong> I agree to register with
            Heart of Life Line Care Foundation (HLLCAF) and consent to the use of my details solely
            for Foundation communications, volunteer activities, and humanitarian programs in accordance with
            data privacy guidelines.
          </span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting Registration..." : "Complete Membership Registration"}
      </button>

      <p className="privacy-guarantee">
        🔒 <strong>Your privacy matters:</strong> Your information is stored securely in accordance
        with Nigerian Data Protection regulations (NDPA). We never sell, rent, or share personal data with third parties.
      </p>
    </form>
  );
}
