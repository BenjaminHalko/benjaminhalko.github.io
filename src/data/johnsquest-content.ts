import type { ImageMetadata } from "astro";
import gifBossWorld2 from "../pages/johnsquest/res/gifs/boss_world2.gif";
import gifFallingRocks from "../pages/johnsquest/res/gifs/falling_rocks.gif";
import gifOpening from "../pages/johnsquest/res/gifs/opening.gif";
import gifSprings from "../pages/johnsquest/res/gifs/springs.gif";
import gifSword from "../pages/johnsquest/res/gifs/sword.gif";
import gifWalking from "../pages/johnsquest/res/gifs/walking.gif";

export const johnsQuestDescription =
  "Travel through the 4 mystical genres of gaming to defeat Evil John and his 6 Evil Eyes";

export const johnsQuestGifs: ReadonlyArray<{
  image: ImageMetadata;
  alt: string;
  /** These two compress WORSE as animated webp (+18%/+81%); keep them gif. */
  format?: "gif";
}> = [
  { image: gifSprings, alt: "John's Quest platforming gameplay" },
  { image: gifSword, alt: "John's Quest sword combat gameplay" },
  { image: gifBossWorld2, alt: "John's Quest fight with Evil Eyes", format: "gif" },
  { image: gifWalking, alt: "John's Quest walking adventure" },
  { image: gifFallingRocks, alt: "John's Quest rocks" },
  { image: gifOpening, alt: "John's Quest opening sequence", format: "gif" },
];

export const johnsQuestFeatures: ReadonlyArray<{ title: string; desc: string }> = [
  { title: "Multi-Genre Adventure", desc: "Every level is different, thanks to Evil John" },
  { title: "Rhythm-based Platforming", desc: "Everything moves in time with the music" },
  { title: "Sword-based Combat", desc: 'Includes "Bomb-based Combat" as well' },
  { title: "Mouse-based Movement", desc: "Simply click where you want to go" },
  { title: "Laser-based Gun", desc: "You shoot lasers... with a gun (that's it)" },
  { title: "Multi-Phase Boss Battles", desc: "Take on Evil John in deadly fights" },
  { title: "Humor", desc: "Maybe" },
  { title: "Play as John", desc: "Arguably the most important feature" },
];

export const johnsQuestTags = [
  "2D Platformer",
  "Action RPG",
  "Point & Click",
  "Twin Stick Shooter",
  "Multi-genre",
  "Comedy",
  "Retro",
  "Adventure",
];
