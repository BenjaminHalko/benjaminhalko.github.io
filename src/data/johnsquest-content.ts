import type { ImageMetadata } from "astro";
import gifBossWorld2 from "../res/johnsquest/gifs/boss_world2.gif";
import gifFallingRocks from "../res/johnsquest/gifs/falling_rocks.gif";
import gifOpening from "../res/johnsquest/gifs/opening.gif";
import gifSprings from "../res/johnsquest/gifs/springs.gif";
import gifSword from "../res/johnsquest/gifs/sword.gif";
import gifWalking from "../res/johnsquest/gifs/walking.gif";

export const johnsQuestDescription =
  "Travel through the 4 mystical genres of gaming to defeat Evil John and his 6 Evil Eyes";

export const johnsQuestGifs: ReadonlyArray<{
  image: ImageMetadata;
  alt: string;
  format?: "gif";
}> = [
  { image: gifSprings, alt: "John's Quest platforming gameplay", format: "gif" },
  { image: gifSword, alt: "John's Quest sword combat gameplay", format: "gif" },
  { image: gifBossWorld2, alt: "John's Quest fight with Evil Eyes", format: "gif" },
  { image: gifWalking, alt: "John's Quest walking adventure", format: "gif" },
  { image: gifFallingRocks, alt: "John's Quest rocks", format: "gif" },
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
