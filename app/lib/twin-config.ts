export const DEFAULT_TWIN_MODEL = "openai/gpt-oss-120b";
export const TWIN_TEMPERATURE = 0.4;
export const TWIN_MAX_TOKENS = 700;
export const TWIN_TIMEOUT_MS = 25_000;
export const MAX_REQUEST_BYTES = 16_384;
export const MAX_MESSAGE_CHARS = 2_000;
export const MAX_CONTEXT_MESSAGES = 6;

export function getTwinModel() {
  return process.env.OPENROUTER_MODEL?.trim() || DEFAULT_TWIN_MODEL;
}
