import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  replyTo?: unknown;
  topic?: unknown;
  message?: unknown;
};

const MAX_CONTACT_REQUEST_BYTES = 8_192;
const CONTACT_RATE_LIMIT_WINDOW_MS = 60_000;
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 3;
const contactRateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

function getClientId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "local";
}

function enforceContactRateLimit(request: Request) {
  const key = getClientId(request);
  const now = Date.now();
  const current = contactRateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    contactRateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= CONTACT_RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1_000),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f-\u009f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");

  if (contentLength > MAX_CONTACT_REQUEST_BYTES) {
    return jsonError("Your contact request is too large. Please shorten it.", 413);
  }

  const rateLimit = enforceContactRateLimit(request);

  if (!rateLimit.allowed) {
    return jsonError("Too many contact requests. Please retry shortly.", 429, {
      "Retry-After": String(rateLimit.retryAfter),
    });
  }

  try {
    const body = (await request.json()) as ContactPayload;
    const name = cleanText(body.name, 80);
    const replyTo = cleanText(body.replyTo, 120);
    const topic = cleanText(body.topic, 120);
    const message = cleanText(body.message, 1_200);

    if (!name || !replyTo || !topic || !message) {
      return jsonError("Please complete all contact form fields.", 400);
    }

    if (!isValidEmail(replyTo)) {
      return jsonError("Please provide a valid reply email address.", 400);
    }

    if (message.length < 20) {
      return jsonError("Please include a little more context in your message.", 400);
    }

    const payload = {
      name,
      replyTo,
      topic,
      message,
      submittedAt: new Date().toISOString(),
    };
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Contact webhook failed", { status: response.status });
        return jsonError("The contact service is unavailable. Please retry later.", 502);
      }
    } else {
      console.info("Contact request received. Configure CONTACT_WEBHOOK_URL to forward it.", {
        name,
        replyTo,
        topic,
        messagePreview: message.slice(0, 120),
      });
    }

    return NextResponse.json({
      message: "Thanks. Your contact request has been submitted.",
    });
  } catch (error) {
    console.error("Unexpected contact form error", { error });
    return jsonError("Unable to submit the contact request right now.", 500);
  }
}
