import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="section-shell privacy-page">
      <Link className="back-link" href="/">
        Back to portfolio
      </Link>
      <section className="content-section" aria-labelledby="privacy-heading">
        <div className="section-heading">
          <p className="eyebrow">Privacy Notice</p>
          <h1 id="privacy-heading">Digital Twin Chat Privacy</h1>
        </div>
        <div className="privacy-card">
          <p>
            The Digital Twin chat sends your messages to OpenRouter so an AI
            model can generate a response about Mohammad Talah Sheikh&apos;s
            career profile. Do not submit confidential, sensitive, or personal
            information that you would not want processed by a third-party AI
            provider.
          </p>
          <p>
            The site does not intentionally store chat transcripts in a
            database. Hosting providers and OpenRouter may process request logs
            according to their own retention and security policies.
          </p>
          <p>
            For privacy questions or removal requests, use the professional
            LinkedIn profile linked from the portfolio contact section.
          </p>
        </div>
      </section>
    </main>
  );
}
