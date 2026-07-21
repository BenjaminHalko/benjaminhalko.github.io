export type DeferredGifKey =
  | "springs"
  | "sword"
  | "boss_world2"
  | "walking"
  | "falling_rocks"
  | "opening";

export const johnsQuestGifs: ReadonlyArray<{
  key: DeferredGifKey;
  fallbackSrc: string;
  alt: string;
}> = [
  { key: "springs", fallbackSrc: "/pages/johnsquest/res/gifs/springs.gif", alt: "John's Quest platforming gameplay" },
  { key: "sword", fallbackSrc: "/pages/johnsquest/res/gifs/sword.gif", alt: "John's Quest sword combat gameplay" },
  { key: "boss_world2", fallbackSrc: "/pages/johnsquest/res/gifs/boss_world2.gif", alt: "John's Quest fight with Evil Eyes" },
  { key: "walking", fallbackSrc: "/pages/johnsquest/res/gifs/walking.gif", alt: "John's Quest walking adventure" },
  { key: "falling_rocks", fallbackSrc: "/pages/johnsquest/res/gifs/falling_rocks.gif", alt: "John's Quest rocks" },
  { key: "opening", fallbackSrc: "/pages/johnsquest/res/gifs/opening.gif", alt: "John's Quest opening sequence" },
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
