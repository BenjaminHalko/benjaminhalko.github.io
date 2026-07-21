/** @jsxRuntime automatic @jsxImportSource preact */
import { Navbar } from "../../components/Navbar";
import { TransitionScripts } from "../../components/TransitionScripts";
import type { GameData } from "../../data/games";

export function PrivacyPage({ game }: { game: GameData }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="robots" content="noindex" />
        <TransitionScripts />
        <link
          rel="icon"
          type="image/png"
          href={`/res/games/${game.id}/favicon.png`}
        />
        <title>{game.name} - Privacy Policy</title>
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/pages/games/games.css" />
      </head>
      <body>
        <Navbar />
        <main class="content">
          <section class="container" aria-label="Privacy Policy">
            <h1>{game.name} - Privacy Policy</h1>
            <h2>User Info</h2>
            <p>No user info is collected by me.</p>
            <h2>Save Data</h2>
            <p>Save files are used to save settings and scores.</p>
            {game.useFirebase ? (
              <>
                <h2>Leaderboard</h2>
                <p>Google Firebase Database is used to store user scores.</p>
              </>
            ) : (
              <>
                <h2>Google Play Games</h2>
                <p>
                  Google Play Games is used to store Achievements and
                  Leaderboards.
                </p>
              </>
            )}
          </section>
        </main>
      </body>
    </html>
  );
}
