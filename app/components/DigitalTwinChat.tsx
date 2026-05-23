"use client";

import { FormEvent, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterQuestions = [
  "What kind of AI architecture experience does Talah have?",
  "Summarise Talah's banking platform background.",
  "What roles would Talah be strongest for?",
];

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Talah's Digital Twin. Ask me about his career journey, AI specialisation, enterprise architecture work, or project background.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function sendMessage(question?: string) {
    const content = (question ?? input).trim();

    if (!content || isLoading) {
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "The Digital Twin could not respond.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply as string },
      ]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while contacting the Digital Twin.",
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <section className="section-shell content-section twin-section" id="digital-twin">
      <div className="section-heading twin-heading">
        <p className="eyebrow">Digital Twin</p>
        <h2>Ask an AI version of Talah about his career.</h2>
        <p>
          Powered by OpenRouter, this assistant is grounded in Talah&apos;s
          LinkedIn profile and answers questions about his experience,
          strengths, projects, and career fit.
        </p>
      </div>

      <div className="chat-shell">
        <div className="chat-topbar">
          <div>
            <span className="status-dot" aria-hidden="true" />
            <strong>Talah Digital Twin</strong>
          </div>
          <span>openai/gpt-oss-120b</span>
        </div>

        <div className="starter-row" aria-label="Suggested questions">
          {starterQuestions.map((question) => (
            <button
              type="button"
              key={question}
              onClick={() => void sendMessage(question)}
              disabled={isLoading}
            >
              {question}
            </button>
          ))}
        </div>

        <div className="messages" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
              <span>{message.role === "assistant" ? "Digital Twin" : "You"}</span>
              <p>{message.content}</p>
            </div>
          ))}
          {isLoading ? (
            <div className="message assistant loading-message">
              <span>Digital Twin</span>
              <p>Thinking through Talah&apos;s career context...</p>
            </div>
          ) : null}
        </div>

        {error ? <p className="chat-error">{error}</p> : null}

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about AI architecture, banking platforms, leadership..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? "Sending" : "Ask"}
          </button>
        </form>
      </div>
    </section>
  );
}
