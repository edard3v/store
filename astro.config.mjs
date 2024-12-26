// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },

  integrations: [db()],
  output: "server",
  adapter: netlify(),
});
