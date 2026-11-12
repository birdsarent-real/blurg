/*
 * THE BLURGBLOG — The Golden Blurgs (best scene awards)
 * ---------------------------------------------------------------
 *   award   : the category name
 *   slug    : the winning film's slug in reviews.js (pulls in title, year, colors
 *             and links to the review). Or leave it out and set title/year/country.
 *   scene   : the winning scene
 *   why     : a sentence or two on why it won
 *
 * Put something on the TV with ONE of these (leave the others empty):
 *   youtube : a YouTube link, e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
 *             (youtu.be/… and /shorts/… links work too). Click-to-play: nothing
 *             loads from YouTube until a visitor presses play.
 *   gif     : a GIF in your folder, e.g. "images/awards/the-raid.gif",
 *             or a full https:// link to a GIF
 *   video   : a short .mp4/.webm clip, e.g. "images/awards/clip.mp4" (plays muted on loop)
 *
 *   link    : optional extra link (any URL), shown as "Watch the scene ↗"
 *
 * With nothing set, the TV shows static and "NO SIGNAL".
 */
window.AWARDS = [
  {
    award: "Best Fight",
    slug: "the-raid",
    scene: "Two cops versus Mad Dog",
    why: "Exhausting, brutal, perfectly paced. Ends with a fluorescent light tube doing a job it was never designed for.",
    youtube: "", gif: "", video: "", link: ""
  },
  {
    award: "Best Training Montage",
    slug: "36th-chamber-of-shaolin",
    scene: "The water-bucket chamber",
    why: "Arms out, buckets full, knives strapped to his elbows. Gordon Liu suffers so you don't have to.",
    youtube: "", gif: "", video: "", link: ""
  },
  {
    award: "Best Use of Mirrors",
    slug: "enter-the-dragon",
    scene: "The hall of mirrors finale",
    why: "Infinite Bruces, infinite Hans, one perfect climax. Every mirror-room fight since is just a cover version.",
    youtube: "", gif: "images/awards/enter-the-dragon-mirrors.gif", video: "", link: ""
  },
  {
    award: "Most Heart",
    slug: "miami-connection",
    scene: "Dragon Sound takes the stage",
    why: "Taekwondo orphans with keytars, singing about friendship. It's impossible to stay cynical.",
    youtube: "", gif: "", video: "", link: ""
  },
  {
    award: "Best Villain Weapon",
    slug: "master-of-the-flying-guillotine",
    scene: "The guillotine's first flight",
    why: "It's a hat. On a chain. It takes heads off. Nothing else was even nominated.",
    youtube: "", gif: "", video: "", link: ""
  },
  {
    award: "Stunt Nobody Should Have Attempted",
    slug: "ong-bak",
    scene: "The street chase",
    why: "Tony Jaa leaps through rings of barbed wire and over moving cars. No wires, no CGI, possibly no insurance.",
    youtube: "", gif: "", video: "", link: ""
  },
  {
    award: "Coolest Walk",
    slug: "lady-snowblood",
    scene: "Through the snow, umbrella in hand",
    why: "Meiko Kaji doesn't need to say a word. The walk says it all.",
    youtube: "", gif: "", video: "", link: ""
  },
  {
    award: "Most Unhinged Premise",
    slug: "robo-vampire",
    scene: "Robo's grand entrance",
    why: "A cardboard robot cop arrives to fight hopping vampires. The judges were speechless. So was the editor.",
    youtube: "", gif: "", video: "", link: ""
  }
];
