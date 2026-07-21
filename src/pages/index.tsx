/** @jsxRuntime automatic @jsxImportSource preact */
import { Head } from "../components/Head";
import { JsonLd } from "../components/JsonLd";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { personSchema } from "../schema/person";
import { websiteSchema } from "../schema/website";
import { SITE, SOCIALS } from "../data/site";

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
        <Navbar />
        <main class="content">
          <header class="logo">
            <img
              {...{ onclick: "window.toggleSnake()", onkeydown: "if(event.key==='Enter') window.toggleSnake()" }}
              tabIndex={0}
              role="button"
              src="/res/avatar.png"
              alt={`${SITE.author} Profile`}
              decoding="async"
            />
            <div id="logoContent">
              <h1>{SITE.author}</h1>
              <p>{SITE.tagline}</p>
            </div>
          </header>

          <a
            href="/johnsquest"
            class="featured-game"
            style="margin-bottom: 20px"
            aria-label="View John's Quest"
          >
            <div class="featured-game-content">
              <h2>John's Quest</h2>
              <p>You are John Appleby, game historian.</p>
              <span class="cta-button" aria-hidden="true">Learn More</span>
            </div>
          </a>

          <section id="games" class="games" style="margin-bottom: 20px" aria-label="Games">
            <a href="https://hammerhex.com" class="game-card" aria-label="Hammer Hex">
              <img
                src="/res/games/hammerhex/logo.png"
                alt="Hammer Hex Logo"
                class="game-logo"
              />
              <p class="coming-soon">Coming Soon</p>
            </a>
            <a
              href="https://store.steampowered.com/app/2944340/Unless/"
              class="game-card"
              aria-label="Unless on Steam"
            >
              <img
                src="/res/games/unless/logo.png"
                alt="Unless Logo"
                class="game-logo"
              />
              <p class="coming-soon">Available on Steam</p>
            </a>
          </section>

          <section class="socials links-section" style="margin-bottom: 20px" aria-label="Social Links">
            <h2 style="width: 100%; text-align: center; margin-top: 0">
              Links
            </h2>
            {SOCIALS.map((s) => (
              <Button
                link={s.link}
                color={s.color}
                text={s.text}
                icon={s.icon}
              />
            ))}
          </section>
        </main>
      </body>
    </html>
  );
}
