/** @jsxRuntime automatic @jsxImportSource preact */
import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";
import { type GameData } from "../../data/games";
import { loadSvg } from "../../data/svg";

import { Head } from "../../components/Head";
import { JsonLd } from "../../components/JsonLd";
import { generateGameSchema } from "../../schema/game";
import { gameDescriptions } from "./descriptions";

export function GamePage({ game }: { game: GameData }) {
  return (
    <html lang="en">
      <Head
        title={game.name}
        description={game.description || `Play ${game.name}`}
        favicons={
          <link
            rel="icon"
            type="image/png"
            href={`/res/games/${game.id}/favicon.png`}
          />
        }
        styles={["/styles/main.css", "/pages/games/games.css"]}
        og={{
          url: `https://benjaminhalko.dev/${game.id}`,
          title: game.name,
          description: game.description || `Play ${game.name}`,
          image: `/res/games/${game.id}/og.png`,
        }}
        twitter={{
          card: "summary_large_image",
          url: `https://benjaminhalko.dev/${game.id}`,
          title: game.name,
          description: game.description || `Play ${game.name}`,
          image: `/res/games/${game.id}/og.png`,
        }}
      >
        <JsonLd schema={generateGameSchema(game)} />
      </Head>
      <body>
        <Navbar />
        <main class="content store-layout">
          <div class="store-main">
            <h1 style="margin: 0; padding: 0; display: flex;">
              <img
                src={`/res/games/${game.id}/logo.png`}
                alt={game.name}
                class="store-cover"
              />
            </h1>
            <div class="store-description">
              {gameDescriptions[game.id] ? (
                <div class="user-formatted-content">
                  {gameDescriptions[game.id]}
                </div>
              ) : (
                <p>{game.description || "A game by Benjamin Halko."}</p>
              )}
            </div>
          </div>
          
          <aside class="store-sidebar">
            <nav class="store-buttons" aria-label="Game Store Links">
              {game.itchio && (
                <Button
                  link={game.itchio}
                  color="#FA5C5C"
                  text="Itch.io"
                  icon="itchio"
                />
              )}
              {game.googleplay && (
                <Button
                  link={game.googleplay}
                  color="lime"
                  text="Google Play"
                  icon="googleplay"
                />
              )}
              {game.gxgames && (
                <Button
                  link={game.gxgames}
                  color="#fc1d4e"
                  text="GX Games"
                  icon="operagx"
                />
              )}
              {game.github && (
                <Button
                  link={game.github}
                  color="cyan"
                  text="GitHub"
                  icon="github"
                />
              )}
            </nav>
            
            <div class="store-metadata">
              <div class="meta-row">
                <span class="meta-label">Developer</span>
                <span class="meta-value">Benjamin Halko</span>
              </div>
              {game.genre && (
                <div class="meta-row">
                  <span class="meta-label">Genre</span>
                  <span class="meta-value">{game.genre}</span>
                </div>
              )}
              {game.jamEventName && game.jamEventUrl && (
                <div class="meta-row">
                  <span class="meta-label">Jam</span>
                  <a
                    class="meta-value meta-link"
                    href={game.jamEventUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {game.jamEventName}
                  </a>
                </div>
              )}
              {game.platforms && game.platforms.length > 0 && (
                <div class="meta-row">
                  <span class="meta-label">Platform</span>
                  <span class="meta-value platform-icons">
                    {game.platforms.map((p) => (
                      <span
                        class="platform-icon"
                        dangerouslySetInnerHTML={{ __html: loadSvg(p) }}
                        title={p}
                        aria-label={p}
                        role="img"
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            <footer class="game-footer-links">
              <Button
                link={`/${game.id}/privacypolicy`}
                color="grey"
                text="Privacy Policy"
                icon="privacy"
                style="padding: 8px 16px; font-size: 0.9rem;"
                newTab={false}
              />
            </footer>
          </aside>
        </main>
      </body>
    </html>
  );
}
