import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const DEFAULT_DEV_PORT = 5173;

function parseDevPort(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_DEV_PORT;
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // vite.config.ts runs in Node, before the browser-side env module
  // (src/lib/env.ts) exists — it must read process.env itself via
  // loadEnv(), never import.meta.env or the app's env module.
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseDevPort(env.VITE_DEV_PORT);

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: true,
      // Allows reaching the dev server from another device on the same
      // network (http://IP_DEL_EQUIPO:PUERTO) for manual testing.
      // Dev-only convenience — never use the Vite dev server in production.
      host: true,
    },
  };
});
