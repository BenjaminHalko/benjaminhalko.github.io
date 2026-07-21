import { defineConfig } from "vite";
import { resolve } from "path";
import Sitemap from "vite-plugin-sitemap";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { renderPlugin } from "./config/render-plugin";
import { SITE } from "./src/data/site";

const root = resolve(__dirname, "src");
const { plugin: pageRenderPlugin, input, pages } = renderPlugin(root);
const excludedPages = pages
  .filter((p) => p.outputPath.endsWith("/privacypolicy.html"))
  .map(
    (p) =>
      "/" + p.outputPath.replace(/\/index\.html$/, "").replace(/\.html$/, ""),
  );

export default defineConfig({
  root: "src",
  publicDir: "../public",
  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "preact",
    },
  },
  build: {
    outDir: "../build",
    emptyOutDir: true,
    rollupOptions: { input },
  },

  plugins: [
    pageRenderPlugin,
    ViteImageOptimizer(),
    Sitemap({
      hostname: SITE.hostname,
      exclude: excludedPages,
      outDir: "build",
    }),
  ],
});
