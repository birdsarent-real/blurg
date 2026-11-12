/*
 * THE BLURGBLOG — Coming Soon schedule
 * ---------------------------------------------------------------
 *   date   : "YYYY-MM-DD", the day the review is planned to go up
 *   status : "reviewing"  -> REWINDING NOW (watching it right now)
 *            "writing"    -> WATCHED · WRITING
 *            "in-transit" -> IN TRANSIT (tape is on its way)
 *            "on-order"   -> ON ORDER
 *   kind   : "classic" or "bad" (which aisle it's headed to)
 *   slug   : optional. When a review in reviews.js has this same slug,
 *            the entry automatically flips to "NOW ON THE SHELF".
 *
 * Entries are sorted by date automatically, and anything whose date has
 * passed (and isn't reviewed yet) is marked "RUNNING LATE".
 */
window.UPCOMING = [
  {
    date: "2026-11-13",
    title: "Iron Monkey",
    year: 1993, country: "Hong Kong",
    director: "Yuen Woo-ping",
    starring: "Donnie Yen, Yu Rongguang",
    kind: "classic", status: "reviewing", slug: "iron-monkey",
    note: "A Robin Hood with a mask, and fights on top of wooden poles over fire. Tape is in the VCR.",
    tagline: "Steal from the rich. Kick everyone.",
    colors: ["#ffb347", "#5a1a00", "#fff2cc"], layout: 1
  },
  {
    date: "2026-11-20",
    title: "Riki-Oh: The Story of Ricky",
    year: 1991, country: "Hong Kong",
    director: "Lam Nai-choi",
    starring: "Fan Siu-wong",
    kind: "bad", status: "writing", slug: "riki-oh",
    note: "Prison movie. Very, very gooey prison movie. Watched it, need a minute.",
    tagline: "He's not punching. He's demolishing.",
    colors: ["#d81b1b", "#1a0505", "#ffe066"], layout: 3
  },
  {
    date: "2026-11-27",
    title: "Fist of Legend",
    year: 1994, country: "Hong Kong",
    director: "Gordon Chan",
    starring: "Jet Li",
    kind: "classic", status: "in-transit", slug: "fist-of-legend",
    note: "Jet Li remakes a Bruce Lee classic and the choreography might top it.",
    tagline: "A legend is reborn.",
    colors: ["#e9e4d4", "#2b2b2b", "#b3122d"], layout: 2
  },
  {
    date: "2026-12-04",
    title: "The Undefeatable",
    year: 1993, country: "Hong Kong",
    director: "Godfrey Ho",
    starring: "Cynthia Rothrock, Don Niam",
    kind: "bad", status: "on-order", slug: "the-undefeatable",
    note: "I've only heard rumors about the final fight. I am told it involves a screwdriver.",
    tagline: "Nobody beats Stingray.",
    colors: ["#00e0ff", "#120a3a", "#ff3fa4"], layout: 4
  },
  {
    date: "2026-12-11",
    title: "Chocolate",
    year: 2008, country: "Thailand",
    director: "Prachya Pinkaew",
    starring: "JeeJa Yanin",
    kind: "classic", status: "on-order", slug: "chocolate",
    note: "From the Ong-Bak director. The end-credits bloopers are supposedly a horror show of real hits.",
    tagline: "Sweet. Then not.",
    colors: ["#6b3a1e", "#1e0d04", "#ff9ec7"], layout: 1
  },
  {
    date: "2026-12-18",
    title: "Headshot",
    year: 2016, country: "Indonesia",
    director: "Kimo Stamboel & Timo Tjahjanto",
    starring: "Iko Uwais",
    kind: "classic", status: "on-order", slug: "headshot",
    note: "Iko Uwais again, this time with amnesia and an island full of very angry people.",
    tagline: "He forgot everything except how to fight.",
    colors: ["#3c4a4a", "#050808", "#ffcc00"], layout: 3
  },
  {
    date: "2026-12-25",
    title: "Kung Fu Hustle",
    year: 2004, country: "Hong Kong",
    director: "Stephen Chow",
    starring: "Stephen Chow, Yuen Wah, Yuen Qiu",
    kind: "classic", status: "on-order", slug: "kung-fu-hustle",
    note: "Holiday special! A live-action cartoon with a landlady you do not want to mess with.",
    tagline: "Not all heroes wear robes.",
    colors: ["#ffd400", "#a3150d", "#111111"], layout: 4
  },
  {
    date: "2027-01-01",
    title: "Shogun Assassin",
    year: 1980, country: "Japan",
    director: "Robert Houston",
    starring: "Tomisaburo Wakayama",
    kind: "classic", status: "on-order", slug: "shogun-assassin",
    note: "New Year's double feature energy: a lone swordsman, a baby cart, and buckets of red paint.",
    tagline: "A father. A son. A baby cart full of weapons.",
    colors: ["#f2eee5", "#7d0a0a", "#141414"], layout: 2
  }
];
