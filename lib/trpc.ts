import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";
import { brandConfig } from "@/constants/brandConfig";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  // Production domain
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // Default to brand domain
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Fallback to brand domain
  return `https://${brandConfig.domain}`;
};

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      headers: () => {
        return {
          'Content-Type': 'application/json',
          'User-Agent': `${brandConfig.name}/1.0.0`,
        };
      },
    }),
  ],
});