/** @jsxRuntime automatic @jsxImportSource preact */
import { Button } from "../../components/Button";
import { gameLinks, type GameData } from "../../data/games";

export function GamePage({ game }: { game: GameData }) {
  const links = gameLinks(game);
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link
          rel="icon"
          type="image/png"
          href={`/res/games/${game.id}/favicon.png`}
        />
        <title>{game.name}</title>
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/pages/games/games.css" />
      </head>
      <body>
        <div class="content">
          <img
            src={`/res/games/${game.id}/logo.png`}
            style="max-width: 100%; max-height: 200px"
          />
          <div class="buttons">
            <Button
              link={links.itchioLink}
              color="#FA5C5C"
              text="Itch.io"
              icon="itchio"
            />
            <Button
              link={links.googleplayLink}
              color="lime"
              text="Google Play"
              icon="googleplay"
            />
            {links.gxgamesLink && (
              <Button
                link={links.gxgamesLink}
                color="#fc1d4e"
                text="GX Games"
                icon="operagx"
              />
            )}
            {links.githubLink && (
              <Button
                link={links.githubLink}
                color="cyan"
                text="GitHub"
                icon="github"
              />
            )}
            <Button
              link="privacypolicy.html"
              color="grey"
              text="Privacy Policy"
              icon="privacy"
              style="margin-top: 50px"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
