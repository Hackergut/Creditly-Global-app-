import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";
import { brandConfig } from "../constants/brandConfig";

// app will be mounted at /api
const app = new Hono();

// Enable CORS for Creditly Global domain
app.use("*", cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    `https://${brandConfig.domain}`,
    `https://www.${brandConfig.domain}`,
    // Add development URLs
    process.env.EXPO_PUBLIC_RORK_API_BASE_URL || `https://${brandConfig.domain}`,
  ],
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// Mount tRPC router at /trpc
app.use(
  "/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  })
);

// Simple health check endpoint
app.get("/", (c) => {
  return c.json({ 
    status: "ok", 
    message: `${brandConfig.name} API is running`,
    domain: brandConfig.domain,
    version: "1.0.0"
  });
});

// Endpoint per verificare la configurazione del dominio
app.get("/config", (c) => {
  return c.json({
    brand: brandConfig.name,
    domain: brandConfig.domain,
    baseUrl: process.env.EXPO_PUBLIC_RORK_API_BASE_URL || `https://${brandConfig.domain}`,
    environment: process.env.EXPO_PUBLIC_APP_ENV || "production",
    timestamp: new Date().toISOString()
  });
});

export default app;