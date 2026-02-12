import { defineConfig, Plugin } from "vite";
import { resolve } from "path";
import fs from "fs";
import Handlebars from "handlebars";

interface GameData {
  id: string;
  name: string;
  itchio: string;
  googleplay: string;
  gxgames?: string;
  github?: string;
  useFirebase?: boolean;
}

const games: GameData[] = [
  {
    id: "hammerhex",
    name: "Hammer Hex",
    itchio: "https://bluishgreenpro.itch.io/hammer-hex",
    googleplay: "hammerhex",
    gxgames: "ynf9dg/hammer-hex",
    useFirebase: true,
  },
  {
    id: "makenewfriends",
    name: "Make New Friends",
    itchio: "make-new-friends",
    googleplay: "makenewfriends",
    gxgames: "v408fd/make-new-friends",
    github: "Make-New-Friends",
    useFirebase: true,
  },
  {
    id: "bladesofdoom",
    name: "Blades of Doom",
    itchio: "blades-of-doom",
    googleplay: "bladesofdoom",
    gxgames: "ovtmf7/blades-of-doom",
    github: "Blades-Of-Doom",
  },
  {
    id: "shapeion",
    name: "Shapeion",
    itchio: "shapeion",
    googleplay: "shapeion",
    gxgames: "3tyac9/shapeion",
    github: "Shapeion",
  },
  {
    id: "youareabomb",
    name: "You Are A Bomb",
    itchio: "you-are-a-bomb",
    googleplay: "youareabomb",
    gxgames: "249rmr/you-are-a-bomb",
    github: "You-Are-A-Bomb",
  },
  {
    id: "twilighttempo",
    name: "Twilight Tempo",
    itchio: "twilight-tempo",
    googleplay: "twilighttempo",
    gxgames: "r4gpyp/twilight-tempo",
    github: "Twilight-Tempo",
  },
  {
    id: "spacehole",
    name: "SPACEHOLE",
    itchio: "spacehole",
    googleplay: "spacehole",
    github: "SPACEHOLE",
  },
];

// Register SVG helper - inlines SVG content
const iconsDir = resolve(__dirname, "src/res/icons");
Handlebars.registerHelper("svg", (name: string) => {
  const svgPath = resolve(iconsDir, `${name}.svg`);
  if (fs.existsSync(svgPath)) {
    let svg = fs.readFileSync(svgPath, "utf-8");
    // Remove XML declaration and clean up
    svg = svg.replace(/<\?xml[^>]*\?>/g, "").trim();
    return new Handlebars.SafeString(svg);
  }
  return "";
});

// Load partials
const partialsDir = resolve(__dirname, "src/partials");
for (const file of fs.readdirSync(partialsDir)) {
  if (file.endsWith(".html")) {
    const name = file.replace(".html", "");
    const content = fs.readFileSync(resolve(partialsDir, file), "utf-8");
    Handlebars.registerPartial(name, content);
  }
}

// Compile page templates
const gamePageTemplate = Handlebars.compile(
  fs.readFileSync(resolve(partialsDir, "game-page.html"), "utf-8"),
);
const privacyPageTemplate = Handlebars.compile(
  fs.readFileSync(resolve(partialsDir, "privacy-page.html"), "utf-8"),
);

// Build virtual pages
const virtualPages: Record<string, string> = {};

for (const game of games) {
  const isHammerHex = game.id === "hammerhex";
  const context = {
    ...game,
    itchioLink: isHammerHex
      ? game.itchio
      : `https://benjamin-halko.itch.io/${game.itchio}`,
    googleplayLink: `https://play.google.com/store/apps/details?id=com.benjaminhalko.${game.googleplay}`,
    gxgamesLink: game.gxgames
      ? `https://gx.games/games/${game.gxgames}/`
      : null,
    githubLink: game.github
      ? `https://github.com/BenjaminHalko/${game.github}`
      : null,
  };

  if (game.id != "hammerhex") {
    virtualPages[`${game.id}/index.html`] = gamePageTemplate(context);
  }

  virtualPages[`${game.id}/privacypolicy.html`] = privacyPageTemplate(context);
}

function virtualHtmlPlugin(): Plugin {
  // Map from original path (e.g. "/res/games/spacehole/logo.png") to emitFile reference ID
  const assetRefIds = new Map<string, string>();

  return {
    name: "virtual-html",
    enforce: "pre",

    transformIndexHtml(html) {
      // Transform all HTML files through Handlebars
      const template = Handlebars.compile(html);
      return template({});
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        let url = req.url?.split("?")[0].replace(/^\//, "") || "";

        // Redirect /folder to /folder/ for directories with index.html
        if (url && !url.includes(".") && !url.endsWith("/")) {
          const possibleIndex = `${url}/index.html`;
          const srcPath = resolve(__dirname, "src", possibleIndex);
          if (fs.existsSync(srcPath) || virtualPages[possibleIndex]) {
            res.writeHead(301, { Location: `/${url}/` });
            res.end();
            return;
          }
        }

        if (url === "" || url.endsWith("/")) url += "index.html";

        if (virtualPages[url]) {
          res.setHeader("Content-Type", "text/html");
          server
            .transformIndexHtml(req.url!, virtualPages[url])
            .then((html) => {
              res.end(html);
            })
            .catch(next);
          return;
        }
        next();
      });
    },

    buildStart() {
      // Only emit files during build, not serve
      if (this.meta.watchMode) return;

      // Emit CSS files so they get processed and hashed
      const mainCss = fs.readFileSync(
        resolve(__dirname, "src/styles/main.css"),
        "utf-8",
      );
      const gamesCss = fs.readFileSync(
        resolve(__dirname, "src/styles/games.css"),
        "utf-8",
      );

      this.emitFile({
        type: "asset",
        name: "main.css",
        source: mainCss,
      });
      this.emitFile({
        type: "asset",
        name: "games.css",
        source: gamesCss,
      });

      // Emit static assets from src/res/ with hashing
      const resDir = resolve(__dirname, "src/res");
      const emitAsset = (filePath: string, originalUrl: string) => {
        const refId = this.emitFile({
          type: "asset",
          name: filePath.split("/").pop()!,
          source: fs.readFileSync(filePath),
        });
        assetRefIds.set(originalUrl, refId);
      };

      const emitDir = (dir: string, urlPrefix: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const fullPath = resolve(dir, entry.name);
          if (entry.isDirectory()) {
            emitDir(fullPath, `${urlPrefix}/${entry.name}`);
          } else if (!entry.name.startsWith(".")) {
            emitAsset(fullPath, `${urlPrefix}/${entry.name}`);
          }
        }
      };
      emitDir(resolve(resDir, "games"), "/res/games");
      emitAsset(resolve(resDir, "logo.png"), "/res/logo.png");
    },

    generateBundle(_, bundle) {
      // Find the hashed CSS filenames
      let mainCssFile = "";
      let gamesCssFile = "";

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "asset" && fileName.endsWith(".css")) {
          if (fileName.includes("main") && !fileName.includes("games")) {
            mainCssFile = fileName;
          } else if (fileName.includes("games")) {
            gamesCssFile = fileName;
          }
        }
      }

      // Emit virtual pages with updated CSS and asset paths
      for (const [path, content] of Object.entries(virtualPages)) {
        let html = content;
        if (mainCssFile) {
          html = html.replace("/styles/main.css", `/${mainCssFile}`);
        }
        if (gamesCssFile) {
          html = html.replace("/styles/games.css", `/${gamesCssFile}`);
        }

        // Replace asset paths with hashed filenames
        for (const [originalUrl, refId] of assetRefIds) {
          html = html.replaceAll(originalUrl, `/${this.getFileName(refId)}`);
        }

        this.emitFile({
          type: "asset",
          fileName: path,
          source: html,
        });
      }
    },
  };
}

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../build",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        hammerhex: resolve(__dirname, "src/hammerhex/index.html"),
      },
    },
  },

  plugins: [virtualHtmlPlugin()],
});
