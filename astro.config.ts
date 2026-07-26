import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { SITE } from "./src/data/site";

export default defineConfig({
  site: SITE.hostname,
  srcDir: "./src",
  publicDir: "./public",
  // Must match [assets] directory in wrangler.toml.
  outDir: "./build",
  trailingSlash: "never",
  build: {
    assets: "assets",
    format: "file"
  },
  integrations: [
    icon(),
    sitemap({ filter: (page) => !page.includes("/privacypolicy") }),
  ],
  fonts: [
    {
      name: "Press Start 2P",
      cssVariable: "--font-press-start-2p",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["cursive"],
    },
  ],
});
