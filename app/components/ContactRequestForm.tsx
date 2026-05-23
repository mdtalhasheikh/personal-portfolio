"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactRequestForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          replyTo: formData.get("replyTo"),
          topic: formData.get("topic"),
          message: formData.get("message"),
        }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit the contact request.");
      }

      setStatus("success");
      setMessage(data.message || "Thanks. Your contact request has been submitted.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the contact request right now.",
      );
    }
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Request direct contact details
      </button>

      {isOpen ? (
        <div className="modal-backdrop" role="presentation">
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-heading"
            ref={dialogRef}
          >
            <div className="contact-modal-header">
              <div>
                <p className="eyebrow">Contact Request</p>
                <h3 id="contact-form-heading">Request direct contact details</h3>
              </div>
              <button
                className="modal-close"
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close contact form"
              >
                Close
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input ref={firstInputRef} name="name" required maxLength={80} />
              </label>
              <label>
                Reply email
                <input name="replyTo" type="email" required maxLength={120} />
              </label>
              <label>
                Reason
                <select name="topic" defaultValue="AI architecture discussion" required>
                  <option>AI architecture discussion</option>
                  <option>Consulting opportunity</option>
                  <option>Engineering leadership role</option>
                  <option>Portfolio or project enquiry</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  required
                  minLength={20}
                  maxLength={1200}
                  placeholder="Briefly share the context and the best way to respond."
                />
              </label>

              {message ? <p className={`form-status ${status}`}>{message}</p> : null}

              <div className="contact-form-actions">
                <button type="button" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting" : "Submit request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
