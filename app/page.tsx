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
    label: "years building enterprise systems",
  },
  {
    value: "12+",
    label: "years across banking and payments",
  },
  {
    value: "3",
    label: "AI focus areas: agents, RAG, resilient backends",
  },
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

const journey = [
  {
    period: "2026 - Present",
    role: "Senior Consulting Manager",
    company: "Cognizant",
    detail:
      "Data & AI Architect focused on helping enterprises move GenAI from experiments into measurable, production-grade business capability.",
  },
  {
    period: "2024 - 2026",
    role: "Lead Engineer",
    company: "Fiserv / St.George Bank",
    detail:
      "Delivered secure, high-performance APIs for digital banking while contributing to platform modernisation, reliability, observability, and architecture decisions.",
  },
  {
    period: "2023 - 2024",
    role: "Senior Engineer to Solution Designer",
    company: "Fiserv / Westpac",
    detail:
      "Led Open Banking API modernisation, SOAP-to-REST migration, integration design, NFR validation, and a recognised Galaxy payment switch API enablement POC.",
  },
  {
    period: "2019 - 2023",
    role: "Senior Software Engineer / Lead Engineer",
    company: "Fiserv / Westpac Digital Platforms",
    detail:
      "Built and led enterprise-scale digital banking services, modernised legacy Java systems into Spring Boot microservices, and mentored delivery teams.",
  },
  {
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

export default function Home() {
  return (
    <main>
      <section className="hero section-shell">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#journey">Journey</a>
          <a href="#digital-twin">AI Twin</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Greater Sydney Area · Data & AI Architect</p>
            <h1>Mohammad Talah Sheikh</h1>
            <p className="hero-title">
              Solution Designer, Senior AI & Full-Stack Engineer, and Lead
              Engineer building enterprise-scale GenAI and distributed systems.
            </p>
            <p className="hero-summary">
              I bring deep Java, microservices, and banking platform experience
              into modern AI systems, shaping GenAI solutions that are secure,
              observable, resilient, and ready for production.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#portfolio">
                View Portfolio
              </a>
              <a className="button secondary" href="#digital-twin">
                Ask Digital Twin
              </a>
              <a
                className="button secondary"
                href="https://www.linkedin.com/in/mohammad-talah-sheikh-161aba43"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <aside className="profile-card" aria-label="Profile summary">
            <div className="avatar" aria-hidden="true">
              MTS
            </div>
            <p className="card-kicker">Core Stack</p>
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

      <section className="section-shell content-section" id="about">
        <div className="section-heading">
          <p className="eyebrow">About Me</p>
          <h2>AI-first engineering grounded in enterprise delivery.</h2>
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

      <section className="section-shell content-section">
        <div className="section-heading">
          <p className="eyebrow">Specialisation</p>
          <h2>Where I create leverage.</h2>
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

      <section className="section-shell content-section" id="journey">
        <div className="section-heading">
          <p className="eyebrow">Career Journey</p>
          <h2>From Java lead to AI solutions architect.</h2>
        </div>
        <div className="timeline">
          {journey.map((item) => (
            <article className="timeline-item" key={`${item.period}-${item.role}`}>
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

      <section className="section-shell content-section portfolio" id="portfolio">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h2>Future showcase links.</h2>
        </div>
        <div className="portfolio-grid">
          {portfolioLinks.map((item) => (
            <a className="portfolio-card" href="#" aria-disabled="true" key={item}>
              <span>Coming Soon</span>
              <h3>{item}</h3>
              <p>
                Placeholder for a polished project write-up with architecture,
                outcomes, stack, and demo links.
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="section-shell contact-section" id="contact">
        <div>
          <p className="eyebrow">Let’s Build</p>
          <h2>Enterprise AI systems that move beyond chat.</h2>
          <p>
            Available for AI architecture, solution design, full-stack
            engineering leadership, and production GenAI strategy.
          </p>
        </div>
        <div className="contact-actions">
          <a href="mailto:mdtalhasheikh@gmail.com">mdtalhasheikh@gmail.com</a>
          <a href="tel:+61470495364">+61 470 495 364</a>
        </div>
      </section>
    </main>
  );
}
