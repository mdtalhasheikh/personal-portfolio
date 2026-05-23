import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const profileContext = `
Mohammad Talah Sheikh is based in the Greater Sydney Area.
Current headline: Solution Designer | Senior AI & Full-Stack Engineer | Lead Engineer | Enterprise-Scale GenAI & Distributed Systems | Java, Node.js, React.
Current role: Senior Consulting Manager at Cognizant, Data & AI Architect, May 2026 - Present.
Core skills: AI System Architecture, Solution Architecture, Generative AI Systems.
Core stack: Azure OpenAI, LangGraph, Python, Node.js, Spring Boot, React, Kafka, Vector Databases.
Certifications: Microsoft Certified Azure Fundamentals, Microsoft Certified Azure AI Fundamentals, AHIP Healthcare 101.
Languages: English, Hindi.

Professional summary:
Talah is a Senior Technical Lead, Solution Designer, and AI-first full-stack engineer with 15+ years of experience building enterprise-grade systems across architecture, scalability, and Generative AI. He brings a decade-plus foundation in Java, Spring Boot, microservices, cloud-native architecture, distributed systems, banking, and payments into modern AI systems. His AI focus includes secure, observable, production-ready GenAI platforms in the Azure AI ecosystem. He is interested in moving GenAI beyond chat interfaces into business workflows where systems can reason, invoke tools, and deliver measurable ROI.

AI specialisation:
- Agentic orchestration with LangChain and LangGraph, including stateful workflows, reflection loops, task decomposition, tool usage, and long-term memory.
- Production-first RAG using Azure AI Search and vector databases, with hybrid retrieval, chunking strategies, and hallucination control in financial contexts.
- Asynchronous AI systems using Kafka, Redis, and queue-based orchestration for high-latency LLM workloads and failure-tolerant execution.

Career journey:
- Cognizant, Senior Consulting Manager / Data & AI Architect, May 2026 - Present.
- Fiserv, Lead Engineer, March 2024 - April 2026. Client: St.George Bank / Westpac Group. Worked on Compass Digital Banking Platform, secure high-performance APIs, modernisation, observability, reliability, and stakeholder design decisions.
- Self-driven AI & Generative AI Engineering, January 2023 - April 2026. Built expertise through hands-on projects in RAG, agent orchestration, LLM backend integration, scalable system design, and production-ready architecture.
- Fiserv, Lead Engineer, August 2023 - March 2024. Client: Westpac Banking Corporation. Open Banking / API Modernisation. Senior Engineer with Solution Designer responsibilities. Analysed production issues, designed high-level solutions, owned low-level design, aligned API contracts, led SOAP-to-REST migrations, and validated banking NFRs.
- Fiserv, Lead Engineer, August 2023 - September 2023. Galaxy Payment Switch API Enablement POC over HP Tandem mainframe. Designed secure API abstraction, integrated with mainframe card data, demonstrated API-first event-ready modernisation, approved for productisation, and received recognition for innovation and technical excellence.
- Fiserv, Senior Software Engineer / Lead Engineer, September 2019 - July 2023. Westpac Digital Platforms. Designed, developed, and maintained high-volume REST APIs and integration services, modernised Java servlet and SOAP services to Spring Boot microservices, upgraded Java 7 to 8 to 11, troubleshot production issues, profiled performance with Splunk, mentored engineers, and supported automation-first QA practices.
- Infosys, Technical Lead, February 2017 - August 2019. Client: Westpac. Customer Service Hub, Mortgage Origination & Servicing Platform. Led engineering design and delivery for functional and automation platforms, owned Java automation framework architecture, acted as technical authority for workflows, led 15-member offshore team, and trained functional engineers in automation engineering.
- Infosys, Technical Analyst, November 2010 - January 2017. Payment Master for Blue Cross Blue Shield of Minnesota. Designed payment processing services with SOAP and REST, Java backend services, JSP UI components, comparison engines, reporting modules, code reviews, and mentoring.
Education: Bachelor of Engineering in Computer Science, Technocrats Institute of Technology, Bhopal, 2006 - 2010.
`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY ?? process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenRouter API key is missing from the server environment." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const safeMessages = messages
      .filter(
        (message) =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim(),
      )
      .slice(-10);

    if (safeMessages.length === 0) {
      return NextResponse.json(
        { error: "Please send at least one question." },
        { status: 400 },
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Mohammad Talah Sheikh Portfolio",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        temperature: 0.4,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content: `You are the Digital Twin for Mohammad Talah Sheikh's portfolio website. Answer in first person as Talah when appropriate, but never claim real-time availability or facts outside the profile context. Be professional, concise, specific, and grounded only in this profile context. If asked about something not covered, say what is not available and connect back to relevant experience.\n\n${profileContext}`,
          },
          ...safeMessages,
        ],
      }),
    });

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message ?? "OpenRouter request failed." },
        { status: response.status },
      );
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "OpenRouter returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error while contacting OpenRouter.",
      },
      { status: 500 },
    );
  }
}
