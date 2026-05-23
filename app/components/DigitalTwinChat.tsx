"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterQuestions = [
  "What kind of AI architecture experience does Talah have?",
  "Summarise Talah's banking platform background.",
  "What roles would Talah be strongest for?",
];

const initialMessage: Message = {
  id: "initial-assistant-message",
  role: "assistant",
  content:
    "Hi, I am Talah's Digital Twin. Ask me about his career journey, AI specialisation, enterprise architecture work, or project background.",
};

function createMessage(role: Message["role"], content: string): Message {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageContainer = messagesRef.current;

    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages, isLoading]);

  function resetConversation() {
    setMessages([initialMessage]);
    setError("");
    setInput("");
    inputRef.current?.focus();
  }

  async function sendMessage(question?: string) {
    const content = (question ?? input).trim();

    if (!content || isLoading) {
      return;
    }

    const userMessage = createMessage("user", content);
    const assistantMessage = createMessage("assistant", "");
    const nextMessages: Message[] = [...messages, userMessage];
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
        body: JSON.stringify({ messages: nextMessages, stream: true }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "The Digital Twin could not respond.");
      }

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("text/event-stream")) {
        const data = (await response.json()) as { reply?: string };
        const reply = data.reply?.trim();

        if (!reply) {
          throw new Error("The Digital Twin returned an empty response.");
        }

        setMessages((current) => [...current, createMessage("assistant", reply)]);
        return;
      }

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("The Digital Twin returned an unreadable response.");
      }

      setMessages((current) => [...current, assistantMessage]);

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const line = event
            .split("\n")
            .find((entry) => entry.trim().startsWith("data:"));

          if (!line) {
            continue;
          }

          const payload = line.replace(/^data:\s*/, "").trim();

          if (payload === "[DONE]") {
            continue;
          }

          const parsed = JSON.parse(payload) as { delta?: string };
          const delta = parsed.delta ?? "";

          if (delta) {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantMessage.id
                  ? { ...message, content: message.content + delta }
                  : message,
              ),
            );
          }
        }
      }
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

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <section
      className="section-shell content-section twin-section"
      id="digital-twin"
      aria-labelledby="digital-twin-heading"
    >
      <div className="section-heading twin-heading">
        <p className="eyebrow">Digital Twin</p>
        <h2 id="digital-twin-heading">Ask an AI version of Talah about his career.</h2>
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
          <span>Private AI configuration</span>
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

        <div className="messages" aria-live="polite" ref={messagesRef}>
          {messages.map((message) => (
            <div className={`message ${message.role}`} key={message.id}>
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
          <label className="sr-only" htmlFor="twin-input">
            Ask the Digital Twin
          </label>
          <textarea
            id="twin-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about AI architecture, banking platforms, leadership..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? "Sending" : "Ask"}
          </button>
        </form>
        <div className="chat-footer">
          <p>
            Your messages are sent to OpenRouter to generate replies. Don&apos;t
            share confidential information. See the <a href="/privacy">privacy notice</a>.
          </p>
          <button type="button" onClick={resetConversation} disabled={isLoading}>
            New chat
          </button>
        </div>
      </div>
    </section>
  );
}
