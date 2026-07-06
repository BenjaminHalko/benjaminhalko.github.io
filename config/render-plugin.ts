import type { Plugin } from "vite";
import { resolve } from "path";
import { render } from "preact-render-to-string";
import { buildPages, type PageSpec } from "./pages";

const DOCTYPE = "<!doctype html>\n";

// Serves each generated page as a synthetic .html input under the Vite root so
// Vite's native HTML pipeline hashes its CSS/JS/asset references. Synthetic
// absolute ids (not \0virtual) are required: Vite derives the emitted filename
// from path.relative(root, id).
export function renderPlugin(root: string): {
  plugin: Plugin;
  input: Record<string, string>;
  pages: PageSpec[];
} {
  const pages = buildPages();

  const idToHtml = new Map<string, string>();
  const input: Record<string, string> = {};

  for (const page of pages) {
    const id = resolve(root, page.outputPath);
    idToHtml.set(id, DOCTYPE + render(page.node));
    const key = page.outputPath.replace(/\/index\.html$/, "").replace(/\.html$/, "") || "index";
    input[key] = id;
  }

  const urlToHtml = new Map<string, string>();
  for (const page of pages) {
    urlToHtml.set(page.outputPath, idToHtml.get(resolve(root, page.outputPath))!);
  }

  const plugin: Plugin = {
    name: "tsx-page-render",
    enforce: "pre",

    resolveId(source) {
      if (idToHtml.has(source)) return source;
      return null;
    },

    load(id) {
      return idToHtml.get(id) ?? null;
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        let url = req.url?.split("?")[0].replace(/^\//, "") || "";

        // Redirect /folder -> /folder/ when a page index exists there.
        if (url && !url.includes(".") && !url.endsWith("/")) {
          if (urlToHtml.has(`${url}/index.html`)) {
            res.writeHead(301, { Location: `/${url}/` });
            res.end();
            return;
          }
        }

        if (url === "" || url.endsWith("/")) url += "index.html";
        // Resolve extensionless routes (e.g. /spacehole) to their .html page.
        else if (!url.includes(".") && urlToHtml.has(`${url}.html`)) {
          url += ".html";
        }

        const html = urlToHtml.get(url);
        if (html) {
          server
            .transformIndexHtml(req.url!, html)
            .then((out) => {
              res.setHeader("Content-Type", "text/html");
              res.end(out);
            })
            .catch(next);
          return;
        }
        next();
      });
    },
  };

  return { plugin, input, pages };
}
