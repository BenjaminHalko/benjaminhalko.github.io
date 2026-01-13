import { defineConfig, Plugin } from "vite";
import { resolve } from "path";
import fs from "fs";
import Handlebars from "handlebars";

interface GameData {
  id: string;
  name: string;
  itchio: string;
  googleplay: string;
  gxgames: string;
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
const unlessPageTemplate = Handlebars.compile(
  fs.readFileSync(resolve(partialsDir, "unless-page.html"), "utf-8"),
);

// Build virtual pages
const virtualPages: Record<string, string> = {
  "unless/privacy.html": unlessPageTemplate({}),
};

for (const game of games) {
  const isHammerHex = game.id === "hammerhex";
  const context = {
    ...game,
    itchioLink: isHammerHex
      ? game.itchio
      : `https://benjamin-halko.itch.io/${game.itchio}`,
    googleplayLink: `https://play.google.com/store/apps/details?id=com.benjaminhalko.${game.googleplay}`,
    gxgamesLink: `https://gx.games/games/${game.gxgames}/`,
    githubLink: game.github
      ? `https://github.com/BenjaminHalko/${game.github}`
      : null,
  };

  virtualPages[`${game.id}/index.html`] = gamePageTemplate(context);
  virtualPages[`${game.id}/privacypolicy.html`] = privacyPageTemplate(context);
  virtualPages[`google-play/${game.id}/index.html`] = gamePageTemplate(context);
  virtualPages[`google-play/${game.id}/privacypolicy.html`] =
    privacyPageTemplate(context);
}

function virtualHtmlPlugin(): Plugin {
  let isBuild = false;

  return {
    name: "virtual-html",
    enforce: "pre",

    configResolved(config) {
      isBuild = config.command === "build";
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        let url = req.url?.split("?")[0].replace(/^\//, "") || "";
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
      if (isBuild) {
        this.emitFile({
          type: "chunk",
          id: resolve(__dirname, "src/styles/games-entry.ts"),
          name: "games-css",
        });
      }
    },

    generateBundle(_, bundle) {
      let mainCss = "";
      let gamesCss = "";

      for (const [fileName] of Object.entries(bundle)) {
        if (fileName.endsWith(".css")) {
          if (fileName.includes("games")) {
            gamesCss = fileName;
          } else if (fileName.includes("main")) {
            mainCss = fileName;
          }
        }
      }

      for (const [path, content] of Object.entries(virtualPages)) {
        let html = content;
        if (mainCss) {
          html = html.replace("/styles/main.scss", `/${mainCss}`);
        }
        if (gamesCss) {
          html = html.replace("/styles/games.scss", `/${gamesCss}`);
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
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [virtualHtmlPlugin()],
});
