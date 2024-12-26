// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },

  integrations: [db()],
  output: "static",
  adapter: cloudflare(),
});
