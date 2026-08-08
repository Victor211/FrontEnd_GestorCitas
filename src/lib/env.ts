interface EnvConfig {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
  devPort: number;
  defaultTimezone: string;
  debug: boolean;
}

const DEFAULT_APP_NAME = "Appointment Manager";
const DEFAULT_APP_VERSION = "0.0.0";
const DEFAULT_DEV_PORT = 5173;
const DEFAULT_TIMEZONE = "America/Asuncion";

function normalizeApiBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function parseDevPort(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_DEV_PORT;
}

function parseDebug(value: string | undefined): boolean {
  return value === "true";
}

function readEnv(): EnvConfig {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "Missing required environment variable: VITE_API_BASE_URL. Check your .env file (see .env.example).",
    );
  }

  return {
    appName: import.meta.env.VITE_APP_NAME || DEFAULT_APP_NAME,
    appVersion: import.meta.env.VITE_APP_VERSION || DEFAULT_APP_VERSION,
    apiBaseUrl: normalizeApiBaseUrl(apiBaseUrl),
    devPort: parseDevPort(import.meta.env.VITE_DEV_PORT),
    defaultTimezone: import.meta.env.VITE_DEFAULT_TIMEZONE || DEFAULT_TIMEZONE,
    debug: parseDebug(import.meta.env.VITE_ENABLE_DEBUG),
  };
}

export const env: EnvConfig = readEnv();
