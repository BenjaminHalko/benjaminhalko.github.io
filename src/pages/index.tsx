/** @jsxRuntime automatic @jsxImportSource preact */
import { Head } from "../components/Head";
import { JsonLd } from "../components/JsonLd";
import { Button } from "../components/Button";
import { personSchema } from "../schema/person";
import { websiteSchema } from "../schema/website";
import { SITE } from "../data/site";

const socials = [
  {
    link: "https://store.steampowered.com/developer/benjaminhalko",
    color: "#1b2838",
    text: "Steam",
    icon: "steam",
  },
  {
    link: "https://benjamin-halko.itch.io",
    color: "#FA5C5C",
    text: "itch.io",
    icon: "itchio",
  },
  {
    link: "https://github.com/BenjaminHalko",
    color: "cyan",
    text: "GitHub",
    icon: "github",
  },
  {
    link: "https://youtube.com/BenjaminHalko",
    color: "red",
    text: "YouTube",
    icon: "youtube",
  },
  {
    link: "https://discord.gg/h6k9Q4QCb8",
    color: "#5865F2",
    text: "Discord",
    icon: "discord",
  },
  {
    link: "mailto:contact@benjaminhalko.dev",
    color: "yellow",
    text: "Email",
    icon: "contact",
  },
  {
    link: "https://linkedin.com/in/BenjaminHalko/",
    color: "#0A66C2",
    text: "LinkedIn",
    icon: "linkedin",
  },
];

function Favicons() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/default-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/default-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        {...{ color: "#150e6b" }}
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}

export function HomePage() {
  return (
    <html lang="en">
      <Head
        title={SITE.author}
        favicons={<Favicons />}
        styles={["/styles/main.css", "/pages/home.css"]}
        og={{
          url: SITE.hostname,
          title: SITE.author,
          description: SITE.description,
          image: "/res/logo.png",
        }}
      >
        <script type="module" src="/scripts/background.ts"></script>
        <script type="module" src="/scripts/snake.ts"></script>
        <JsonLd schema={personSchema} />
        <JsonLd schema={websiteSchema} />
      </Head>
      <body>
        <div class="content">
          <div class="logo">
            <img
              {...{ onclick: "window.toggleSnake()" }}
              src="https://github.com/BenjaminHalko.png"
              alt={SITE.author}
            />
            <div id="logoContent">
              <h1>{SITE.author}</h1>
              <p>{SITE.tagline}</p>
            </div>
          </div>

          <a
            href="/johnsquest"
            class="featured-game"
            style="margin-bottom: 20px"
          >
            <div class="featured-game-content">
              <h2>John's Quest</h2>
              <p>You are John Appleby, game historian.</p>
              <span class="cta-button">Learn More</span>
            </div>
          </a>

          <section class="games" style="margin-bottom: 20px">
            <a href="https://hammerhex.com" class="game-card">
              <img
                src="/res/games/hammerhex/logo.png"
                alt="Hammer Hex"
                class="game-logo"
              />
              <p class="coming-soon">Coming Soon</p>
            </a>
            <a
              href="https://store.steampowered.com/app/2944340/Unless/"
              class="game-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/res/games/unless/logo.png"
                alt="Unless"
                class="game-logo"
              />
              <p class="coming-soon">Available on Steam</p>
            </a>
          </section>

          <div class="socials links-section" style="margin-bottom: 20px">
            <h2 style="width: 100%; text-align: center; margin-top: 0">
              Links
            </h2>
            {socials.map((s) => (
              <Button
                link={s.link}
                color={s.color}
                text={s.text}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
