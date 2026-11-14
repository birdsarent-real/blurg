/*
 * THE BACKROOMS — book club data
 * ---------------------------------------------------------------
 * We meet on the 1st of the month, one book per meeting.
 *
 * nowReading : the current book, plus its meeting
 *   meetings : one line per meeting. date is "YYYY-MM-DD"; read is what to
 *              have read by then. Past dates are crossed off automatically.
 * pile       : the shelf. Put the newest meeting first.
 *   meeting  : "YYYY-MM-DD" — the day the club met (or will meet) about it.
 *              Past dates show as ALREADY READ, the soonest future date
 *              gets the NEXT UP sticker, later ones show as ON THE PILE.
 * colors     : [cover colour, darker shade, text colour]
 * goodreads  : the book's Goodreads page. Leave it out and the link falls
 *              back to a Goodreads search for the title and author.
 */
window.BOOK_CLUB = {
  where: "Time and place: ask at the counter.",

  nowReading: {
    title: "Ubik",
    author: "Philip K. Dick",
    year: 1969,
    goodreads: "https://www.goodreads.com/book/show/22590",
    colors: ["#ffcf3f", "#d9480f", "#111111"],
    blurb: "Philip K. Dick at his strangest: a team of anti-psychics, a job on the Moon that goes very wrong, and a world that quietly starts to rot and rewind around them. Coins go out of date. Coffee goes stale in the pot. Ubik is safe when used as directed.",
    meetings: [
      { date: "2026-12-01", read: "The whole book. Then we argue about the ending." }
    ]
  },

  pile: [
    {
      title: "The Haar",
      author: "David Sodergren",
      year: 2022,
      meeting: "2026-11-01",
      goodreads: "https://www.goodreads.com/book/show/60840449",
      colors: ["#aab4bb", "#2c3a43", "#ffffff"],
      note: "Folk horror in a Scottish fishing village: a developer wants Witchaven gone, an old woman won't budge, and a strange fog is rolling in off the sea."
    },
    {
      title: "The Moon Is a Harsh Mistress",
      author: "Robert A. Heinlein",
      year: 1966,
      meeting: "2026-10-01",
      goodreads: "https://www.goodreads.com/book/show/16690",
      colors: ["#d9d9d9", "#4a4a4a", "#b3122d"],
      note: "A lunar prison colony, a wisecracking computer called Mike, and a revolution. There ain't no such thing as a free lunch."
    },
    {
      title: "Childhood's End",
      author: "Arthur C. Clarke",
      year: 1953,
      meeting: "2026-09-01",
      goodreads: "https://www.goodreads.com/book/show/414999",
      colors: ["#1d3557", "#0b1320", "#f1c40f"],
      note: "Vast ships appear over every city, and the alien Overlords bring peace to Earth. What they want in return takes a generation to arrive."
    },
    {
      title: "Between Two Fires",
      author: "Christopher Buehlman",
      year: 2012,
      meeting: "2026-08-01",
      goodreads: "https://www.goodreads.com/book/show/13543121",
      colors: ["#8b1e1e", "#2a0606", "#f4d58d"],
      note: "France, 1348: a disgraced knight finds an orphan girl in a village emptied by the Black Death, and she says the plague is only the start of a war between heaven and hell."
    },
    {
      title: "The Lies of Locke Lamora",
      author: "Scott Lynch",
      year: 2006,
      meeting: "2026-07-01",
      goodreads: "https://www.goodreads.com/book/show/29588376",
      colors: ["#c9a227", "#3b2a05", "#1a1a1a"],
      note: "A gang of gentleman thieves pulls elaborate cons on the nobility of Camorr, a city of canals and very bad people."
    },
    {
      title: "Annihilation",
      author: "Jeff VanderMeer",
      year: 2014,
      meeting: "2026-06-01",
      goodreads: "https://www.goodreads.com/book/show/17934530",
      colors: ["#2d6a4f", "#081c15", "#f4f1de"],
      note: "Four women walk into Area X. The biologist keeps the notes. Nothing stays what it was."
    },
    {
      title: "Neuromancer",
      author: "William Gibson",
      year: 1984,
      meeting: "2026-05-01",
      goodreads: "https://www.goodreads.com/book/show/7546430",
      colors: ["#00c2d6", "#0a0a2a", "#e6ff00"],
      note: "The book that named cyberspace: a burned-out hacker, a razor-girl, and an AI with plans of its own."
    }
  ],

  rules: [
    "The first rule of the Backrooms: you don't talk about the Backrooms.",
    "The second rule: if you do, bring snacks.",
    "Spoilers only after the meeting date. We are not animals.",
    "Dog-ear a page and you get shot like an animal. Use a bookmark."
  ]
};
