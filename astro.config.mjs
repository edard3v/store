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

  output: "static",
  adapter: netlify(),
  integrations: [db()],
});
