import { ContactRequestForm } from "./components/ContactRequestForm";
import { DigitalTwinChat } from "./components/DigitalTwinChat";

const coreStack = [
  "Azure OpenAI",
  "LangGraph",
  "Python",
  "Node.js",
  "Spring Boot",
  "React",
  "Kafka",
  "Vector Databases",
];

const highlights = [
  {
    value: "15+",
    label: "years turning complex platforms into reliable systems",
  },
  {
    value: "12+",
    label: "years inside banking, payments, and regulated delivery",
  },
  {
    value: "3",
    label: "frontiers: agentic AI, RAG, resilient AI backends",
  },
];

const signalStrip = [
  "Enterprise GenAI",
  "Regulated Platforms",
  "API Modernisation",
  "Production Architecture",
];

const specialties = [
  {
    title: "Agentic AI Architecture",
    description:
      "Designing controlled multi-agent workflows with LangChain, LangGraph, tool usage, reflection loops, task decomposition, and memory.",
  },
  {
    title: "Production-First RAG",
    description:
      "Architecting hybrid retrieval pipelines with Azure AI Search, vector databases, chunking strategy, and hallucination controls for regulated domains.",
  },
  {
    title: "Enterprise Integration",
    description:
      "Connecting modern LLM platforms to reliable APIs, event streams, microservices, observability, and security boundaries.",
  },
];

const operatingModes = [
  {
    code: "01",
    title: "Reasoning systems, not demos",
    description:
      "I design GenAI workflows with state, tools, memory, observability, and enterprise boundaries from the start.",
  },
  {
    code: "02",
    title: "Legacy strength into AI leverage",
    description:
      "Years of banking APIs, Java platforms, and payments engineering help me connect AI to systems that actually run businesses.",
  },
  {
    code: "03",
    title: "Delivery shape before code",
    description:
      "I align architecture, stakeholder intent, NFRs, integration contracts, and delivery risk before teams commit to build.",
  },
];

const journey = [
  {
    id: "cognizant-data-ai-architect",
    period: "2026 - Present",
    role: "Senior Consulting Manager",
    company: "Cognizant",
    detail:
      "Data & AI Architect focused on helping enterprises move GenAI from experiments into measurable, production-grade business capability.",
  },
  {
    id: "fiserv-st-george-compass",
    period: "2024 - 2026",
    role: "Lead Engineer",
    company: "Fiserv / St.George Bank",
    detail:
      "Delivered secure, high-performance APIs for digital banking while contributing to platform modernisation, reliability, observability, and architecture decisions.",
  },
  {
    id: "fiserv-westpac-open-banking",
    period: "2023 - 2024",
    role: "Senior Engineer to Solution Designer",
    company: "Fiserv / Westpac",
    detail:
      "Led Open Banking API modernisation, SOAP-to-REST migration, integration design, NFR validation, and a recognised Galaxy payment switch API enablement POC.",
  },
  {
    id: "fiserv-westpac-digital-platforms",
    period: "2019 - 2023",
    role: "Senior Software Engineer / Lead Engineer",
    company: "Fiserv / Westpac Digital Platforms",
    detail:
      "Built and led enterprise-scale digital banking services, modernised legacy Java systems into Spring Boot microservices, and mentored delivery teams.",
  },
  {
    id: "infosys-technical-lead",
    period: "2010 - 2019",
    role: "Technical Lead / Technical Analyst",
    company: "Infosys",
    detail:
      "Progressed from Java developer to technical lead across payments, healthcare, mortgage origination, automation engineering, and offshore team leadership.",
  },
];

const portfolioLinks = [
  "AI orchestration platform",
  "Enterprise RAG reference architecture",
  "Banking API modernisation case study",
];

const engagementReasons = [
  "You need GenAI architecture that can survive production scrutiny.",
  "You are modernising banking, payments, or integration-heavy platforms.",
  "You want an engineering leader who can bridge executives, architects, and delivery teams.",
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammad Talah Sheikh",
  jobTitle: "Senior Consulting Manager, Data & AI Architect",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  sameAs: ["https://www.linkedin.com/in/mohammad-talah-sheikh-161aba43"],
  knowsAbout: [
    "AI System Architecture",
    "Solution Architecture",
    "Generative AI Systems",
    "Azure OpenAI",
    "LangGraph",
    "Spring Boot",
    "React",
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="hero section-shell" aria-labelledby="hero-heading">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#journey">Journey</a>
          <a href="#digital-twin">AI Twin</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-signal-row" aria-label="Professional focus areas">
              {signalStrip.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
            <p className="eyebrow">Greater Sydney Area · Data & AI Architect</p>
            <h1 id="hero-heading">Mohammad Talah Sheikh</h1>
            <p className="hero-title">
              I architect AI systems that can reason, integrate, and operate
              safely inside real enterprise constraints.
            </p>
            <p className="hero-summary">
              My edge is the uncommon overlap of GenAI architecture, full-stack
              engineering, and 12+ years in banking and payments platforms. I
              help teams move from AI ambition to production systems with
              clear design, measurable value, and delivery discipline.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Start a conversation
              </a>
              <a className="button secondary" href="#digital-twin">
                Ask Digital Twin
              </a>
              <a
                className="button secondary"
                href="https://www.linkedin.com/in/mohammad-talah-sheikh-161aba43"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <aside className="profile-card" aria-label="Profile summary">
            <div className="profile-card-header">
              <p className="card-kicker">Architecture Console</p>
              <div className="avatar" aria-hidden="true">
                MTS
              </div>
            </div>
            <div className="system-map" aria-hidden="true">
              <span className="node primary-node">AI</span>
              <span className="node node-a">APIs</span>
              <span className="node node-b">Data</span>
              <span className="node node-c">Ops</span>
              <span className="node node-d">Risk</span>
            </div>
            <p className="console-note">
              Designing the bridge between AI reasoning and the resilient
              enterprise systems that execute it.
            </p>
            <div className="stack-list">
              {coreStack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="metrics section-shell" aria-label="Career highlights">
        {highlights.map((item) => (
          <div className="metric-card" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section-shell command-brief" aria-label="Operating brief">
        <div>
          <p className="eyebrow">Operating Brief</p>
          <h2>What makes the work worth a conversation.</h2>
        </div>
        <div className="brief-grid">
          {operatingModes.map((item) => (
            <article className="brief-card" key={item.code}>
              <span>{item.code}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell content-section"
        id="about"
        aria-labelledby="about-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">About Me</p>
          <h2 id="about-heading">AI-first engineering with enterprise muscle memory.</h2>
        </div>
        <div className="about-grid">
          <p>
            I am a Senior Technical Lead, Solution Designer, and AI-first
            full-stack engineer with 15+ years of experience building
            enterprise-grade systems at the intersection of architecture,
            scalability, and Generative AI.
          </p>
          <p>
            My foundation in Spring Boot, cloud-native architecture,
            microservices, payments, and distributed systems helps me approach AI
            as production software: measurable, governed, observable, and
            integrated into real business workflows.
          </p>
        </div>
      </section>

      <section className="section-shell content-section" aria-labelledby="specialisation-heading">
        <div className="section-heading">
          <p className="eyebrow">Specialisation</p>
          <h2 id="specialisation-heading">Where the profile becomes useful.</h2>
        </div>
        <div className="specialty-grid">
          {specialties.map((item) => (
            <article className="specialty-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell content-section"
        id="journey"
        aria-labelledby="journey-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">Career Journey</p>
          <h2 id="journey-heading">Built in delivery. Reoriented for AI.</h2>
        </div>
        <div className="timeline">
          {journey.map((item) => (
            <article className="timeline-item" key={item.id}>
              <span>{item.period}</span>
              <div>
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DigitalTwinChat />

      <section
        className="section-shell content-section portfolio"
        id="portfolio"
        aria-labelledby="portfolio-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h2 id="portfolio-heading">Selected architecture stories in progress.</h2>
        </div>
        <div className="portfolio-grid">
          {portfolioLinks.map((item) => (
            <button className="portfolio-card" type="button" disabled key={item}>
              <span>Coming Soon</span>
              <h3>{item}</h3>
              <p>
                Placeholder for a polished project write-up with architecture,
                outcomes, stack, and demo links.
              </p>
            </button>
          ))}
        </div>
      </section>

      <section
        className="section-shell contact-section"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <div>
          <p className="eyebrow">Let’s Build</p>
          <h2 id="contact-heading">If the problem has scale, risk, and ambiguity, let’s talk.</h2>
          <p>
            Available for AI architecture, solution design, full-stack
            engineering leadership, and production GenAI strategy.
          </p>
          <ul className="contact-reasons">
            {engagementReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
        <div className="contact-actions">
          <a
            href="https://www.linkedin.com/in/mohammad-talah-sheikh-161aba43"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </a>
          <a href="#digital-twin">Ask the Digital Twin</a>
          <ContactRequestForm />
        </div>
      </section>
    </main>
  );
}
