/** @jsxRuntime automatic @jsxImportSource preact */
import { Head } from "../../components/Head";
import { JsonLd } from "../../components/JsonLd";
import { Navbar } from "../../components/Navbar";
import { johnsQuestSchema } from "../../schema/johnsquest";
import { SITE } from "../../data/site";
import {
  johnsQuestFeatures as features,
  johnsQuestGifs as gifs,
  johnsQuestTags as tags,
} from "./content";

const DESCRIPTION =
  "Travel through the 4 mystical genres of gaming to defeat Evil John and his 6 Evil Eyes";
const COVER = `${SITE.hostname}/johnsquest/res/cover.png`;
const PAGE_URL = `${SITE.hostname}/johnsquest`;

export function JohnsQuestPage() {
  return (
    <html lang="en">
      <Head
        title="John's Quest - Press Kit"
        description={DESCRIPTION}
        favicons={
          <>
            <link
              rel="icon"
              type="image/png"
              href="/johnsquest/favicon/favicon-32x32.png"
              sizes="32x32"
            />
            <link rel="shortcut icon" href="/johnsquest/favicon/favicon.ico" />
          </>
        }
        styles={["/styles/main.css", "/pages/johnsquest/style.css"]}
        og={{
          type: "website",
          url: PAGE_URL,
          title: "John's Quest",
          description: DESCRIPTION,
          image: COVER,
          imageType: "image/png",
        }}
        twitter={{
          card: "summary_large_image",
          url: PAGE_URL,
          title: "John's Quest",
          description: DESCRIPTION,
          image: COVER,
        }}
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
          media="print"
          {...{ onload: "this.media='all'" }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <script type="module" src="/scripts/deferred-media.ts"></script>
        <JsonLd schema={johnsQuestSchema} />
      </Head>
      <body>
        <Navbar />
        <main>
          <img src="/pages/johnsquest/res/logo.png" alt="John's Quest" class="logo" width={1072} height={468} />

          <p class="tagline">
            You are <strong>John Appleby</strong>, game historian.
          </p>

          <section class="links">
            <a
              href="https://store.steampowered.com/app/4346950/Johns_Quest/"
              target="_blank"
              rel="noopener noreferrer"
              class="store-btn steam"
            >
              <img src="/res/icons/steam.svg" alt="" />
              Steam
            </a>
            <a
              href="https://benjamin-halko.itch.io/johns-quest"
              target="_blank"
              rel="noopener noreferrer"
              class="store-btn itch"
            >
              <img src="/res/icons/itchio.svg" alt="" />
              itch.io
            </a>
            <a
              href="https://github.com/BenjaminHalko/John-Quest"
              target="_blank"
              rel="noopener noreferrer"
              class="store-btn github"
            >
              <img src="/res/icons/github.svg" alt="" />
              Source
            </a>
          </section>

          <section class="john">
            <img src="/pages/johnsquest/res/footer.png" alt="" style="width: 100%" loading="lazy" decoding="async" width={784} height={130} />
          </section>

          <section class="trailer">
            <h2>Trailer</h2>
            <iframe
              data-deferred-src="https://www.youtube-nocookie.com/embed/cA0T3so10CQ"
              title="John's Quest Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            ></iframe>
            <noscript>
              <iframe
                src="https://www.youtube-nocookie.com/embed/cA0T3so10CQ"
                title="John's Quest Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </noscript>
          </section>

          <section class="screenshots">
            <h2>Screenshots</h2>
            <div class="screenshot-grid">
              {gifs.map((g) => (
                <>
                  <img data-deferred-key={g.key} alt={g.alt} decoding="async" />
                  <noscript>
                    <img src={g.fallbackSrc} alt={g.alt} loading="lazy" decoding="async" />
                  </noscript>
                </>
              ))}
            </div>
          </section>

          <section class="story">
            <h2>Story</h2>
            <p>
              Your shadow twin, <strong>Evil John</strong>, consumed by envy,
              has unleashed chaos across the realms. With his army of{" "}
              <strong>Evil Eyes</strong>, he has corrupted the land and caused
              genres to collide.
            </p>
            <p>
              Can you use your expertise in gaming to restore peace to the
              world?
            </p>
          </section>

          <section class="features">
            <h2>Features</h2>
            <ul>
              {features.map((f) => (
                <li>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section class="details">
            <h2>Details</h2>
            <ul>
              <li>
                <strong>Price</strong> <span>Free</span>
              </li>
              <li>
                <strong>Release Date</strong> <span>Feb 27, 2026</span>
              </li>
              <li>
                <strong>Developer</strong> <span>Benjamin Halko</span>
              </li>
              <li>
                <strong>Playtime</strong> <span>40 minutes</span>
              </li>
              <li>
                <strong>Stores</strong> <span>Steam, itch.io</span>
              </li>
              <li>
                <strong>Platforms</strong> <span>PC, MacOS, Linux</span>
              </li>
              <li class="tags-item">
                <strong>Tags</strong>
                <div class="tags">
                  {tags.map((t) => (
                    <span class="chip">{t}</span>
                  ))}
                </div>
              </li>
            </ul>
          </section>

          <section class="coverage">
            <h2>Reviews</h2>
            <div class="coverage-item">
              <strong>John Appleby</strong>
              <span class="coverage-quote">
                &ldquo;I don&rsquo;t think I&rsquo;ve ever been this happy to
                blow up my own face&rdquo;
              </span>
            </div>
            <a
              href="https://screenrant.com/steam-free-game-9-10-rpg-release-download/"
              target="_blank"
              rel="noopener noreferrer"
              class="coverage-item"
            >
              <strong>Screen Rant</strong>
              <span class="coverage-quote">
                &ldquo;A Remarkable 9/10 RPG Freebie&rdquo;
              </span>
              <span class="coverage-date">March 2026</span>
            </a>
          </section>

          <section class="presskit">
            <h2>Press Kit</h2>
            <p>
              <a
                href="/johnsquest/johns-quest-presskit.zip"
                download
                class="store-btn"
              >
                <img src="/res/icons/download.svg" alt="" />
                Download Press Kit
              </a>
            </p>
          </section>

          <section class="contact">
            <h2>Contact</h2>
            <p>
              <a href="mailto:contact@benjaminhalko.dev" class="store-btn">
                <img src="/res/icons/contact.svg" alt="" />
                contact@benjaminhalko.dev
              </a>
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}
