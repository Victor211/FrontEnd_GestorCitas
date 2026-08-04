interface EnvConfig {
  apiBaseUrl: string;
}

function readEnv(): EnvConfig {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "Missing required environment variable: VITE_API_BASE_URL. Check your .env file (see .env.example).",
    );
  }

  return { apiBaseUrl };
}

export const env: EnvConfig = readEnv();
