/** @jsxRuntime automatic @jsxImportSource preact */
import { loadSvg } from "../data/svg";
import { SITE, SOCIALS } from "../data/site";
import { games } from "../data/games";

export function Navbar() {
  const navSocials = SOCIALS.slice(0, 4);

  const jamGames = games.filter((g) => g.isJamGame);

  return (
    <nav class="navbar">
      <div class="navbar-left">
        <a href="/">
          <img src="/res/avatar.png" alt={SITE.author} class="nav-avatar" decoding="async" />
          <span>{SITE.author}</span>
        </a>
      </div>
      <div class="navbar-center">
        <a href="/johnsquest">John's Quest</a>
        <div class="nav-dropdown" tabIndex={0}>
          <span class="nav-dropdown-trigger">Games ▾</span>
          <div class="nav-dropdown-content">
            <span class="nav-dropdown-label">Releases</span>
            <a href="/johnsquest">
              <img src="/johnsquest/favicon/favicon-32x32.png" alt="" /> John's Quest
            </a>
            <a href="https://hammerhex.com">
              <img src="/res/games/hammerhex/favicon.png" alt="" /> Hammer Hex
            </a>
            <a href="https://store.steampowered.com/app/2944340/Unless/">
              <img src="/res/games/unless/favicon.png" alt="" /> Unless
            </a>
            <hr class="nav-divider" />
            <span class="nav-dropdown-label">Jam Games</span>
            {jamGames.map((g) => (
              <a href={`/${g.id}`}>
                <img src={`/res/games/${g.id}/favicon.png`} alt="" /> {g.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div class="navbar-right">
        {navSocials.map((s) => (
          <a
            href={s.link}
            class="nav-social"
            style={`--col: ${s.color}`}
            aria-label={s.text}
            dangerouslySetInnerHTML={{ __html: loadSvg(s.icon) }}
          />
        ))}
      </div>
    </nav>
  );
}
