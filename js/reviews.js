/*
 * THE BLURGBLOG — review data
 * ---------------------------------------------------------------
 * To add a review, copy one entry and change the fields.
 *   category : "classic" (Aisle 1) or "bad" (Aisle 2)
 *   craft    : 0–5 (halves ok) — how well-made is it?
 *   fun      : 0–5 (halves ok) — how much fun is it to watch?
 *   colors   : [cover background, cover background 2, accent]
 *   layout   : 1–4, changes the look of the generated VHS cover
 *   poster   : optional, e.g. "images/my-poster.jpg" — uses real poster art
 *              instead of the generated cover (.jpg, .png or .webp)
 *   staffPick: true puts it in the "Staff Picks" aisle too
 */
window.REVIEWS = [
  {
    slug: "enter-the-dragon",
    title: "Enter the Dragon",
    year: 1973,
    country: "Hong Kong",
    director: "Robert Clouse",
    starring: "Bruce Lee, John Saxon, Jim Kelly",
    category: "classic",
    craft: 5, fun: 5,
    tagline: "Boards don't hit back.",
    colors: ["#ffcf3f", "#e0461b", "#141414"],
    layout: 1,
    poster: "images/enter-the-dragon-poster.jpg",
    staffPick: false,
    verdict: "The tape every other tape on this shelf is trying to be.",
    review: [
      "A secret tournament on a private island, a villain with interchangeable hands, and Bruce Lee moving faster than the film stock can keep up with. It's half spy movie, half kung fu showcase, and somehow the seams only make it more charming.",
      "Saxon and Kelly bring big seventies swagger, but nobody is here for them. Every time Lee is on screen the movie snaps into focus — the stillness before the strike is as thrilling as the strike itself.",
      "The mirror-room finale is still one of the best-staged fights ever put on film. Rewind it. Then rewind it again."
    ],
    bestMoment: "The hall of mirrors. Nothing more needs to be said.",
    watchIf: "You have never seen a martial arts movie. Or you have seen every martial arts movie."
  },
  {
    slug: "36th-chamber-of-shaolin",
    title: "The 36th Chamber of Shaolin",
    year: 1978,
    country: "Hong Kong",
    director: "Lau Kar-leung",
    starring: "Gordon Liu",
    category: "classic",
    craft: 5, fun: 4.5,
    tagline: "35 chambers. One way out.",
    colors: ["#f2a541", "#7a1f12", "#ffe9b0"],
    layout: 2,
    poster: "images/36th-chamber-of-shaolin-poster.jpg",
    staffPick: true,
    verdict: "The greatest training montage ever made, stretched lovingly to feature length.",
    review: [
      "Gordon Liu shaves his head, enters the Shaolin temple, and spends most of the runtime getting humiliated by water buckets, swinging logs and incense sticks. It is completely riveting.",
      "Each chamber is its own little puzzle box — learn to see, learn to balance, learn to take a hit to the skull — and Lau Kar-leung shoots them with such clarity that you feel like you could pass the course yourself. (You could not.)",
      "By the time San Te actually fights someone, you've earned it right alongside him. Required viewing."
    ],
    bestMoment: "The head-butting sandbag chamber. Your forehead will hurt in sympathy.",
    watchIf: "You need motivation to go to the gym, or a reason not to."
  },
  {
    slug: "five-deadly-venoms",
    title: "Five Deadly Venoms",
    year: 1978,
    country: "Hong Kong",
    director: "Chang Cheh",
    starring: "The Venom Mob",
    category: "classic",
    craft: 4.5, fun: 5,
    tagline: "Centipede. Snake. Scorpion. Lizard. Toad.",
    colors: ["#1d6b3a", "#07170d", "#d8ff3d"],
    layout: 3,
    poster: "images/five-deadly-venoms-poster.jpg",
    staffPick: false,
    verdict: "A kung fu whodunit with five masked suspects and zero dull minutes.",
    review: [
      "A dying master sends his last student to find five former pupils, each trained in a different animal style, and figure out which ones went bad. Nobody knows who anybody is. It's basically a murder mystery where the clues are kicks.",
      "The Venom Mob became stars off this one, and you can see why — each style has its own personality, from the wall-crawling Lizard to the nearly invulnerable Toad.",
      "There's more courtroom bribery and plotting than you'd expect, but it all pays off in a gloriously acrobatic finale."
    ],
    bestMoment: "The Lizard running along the walls like gravity is a suggestion.",
    watchIf: "You like your kung fu with a side of detective work."
  },
  {
    slug: "drunken-master",
    title: "Drunken Master",
    year: 1978,
    country: "Hong Kong",
    director: "Yuen Woo-ping",
    starring: "Jackie Chan, Yuen Siu-tien",
    category: "classic",
    craft: 4.5, fun: 5,
    tagline: "The more he drinks, the harder he hits.",
    colors: ["#e8c06a", "#5b2c0f", "#fff3d6"],
    layout: 4,
    poster: "images/drunken-master-poster.jpg",
    staffPick: false,
    verdict: "Young Jackie Chan inventing the Jackie Chan movie in real time.",
    review: [
      "A cocky young Wong Fei-hung gets shipped off to a brutal, wine-soaked old master and learns a style built on wobbling, stumbling and never quite falling down.",
      "This is where Chan's mix of slapstick and serious skill really clicks. The comedy is broad, but the choreography is precise to the frame, and the training sequences are hilariously cruel.",
      "Yuen Woo-ping's direction is so lively it practically bounces off the tape."
    ],
    bestMoment: "The final fight, where every 'drunken immortal' style gets its moment.",
    watchIf: "You want to laugh and wince in the same second."
  },
  {
    slug: "lady-snowblood",
    title: "Lady Snowblood",
    year: 1973,
    country: "Japan",
    director: "Toshiya Fujita",
    starring: "Meiko Kaji",
    category: "classic",
    craft: 5, fun: 4,
    tagline: "Born for vengeance.",
    colors: ["#f4f1ea", "#b3122d", "#151515"],
    layout: 2,
    poster: "images/lady-snowblood-poster.jpg",
    staffPick: true,
    verdict: "Gorgeous, cold, and bloodier than a ketchup factory explosion.",
    review: [
      "Meiko Kaji plays a woman raised from birth for one purpose: revenge. She barely raises her voice the entire movie, and she doesn't need to — that stare does the work.",
      "It's built in chapters, part comic-book, part tragedy, with snowy compositions that look like woodblock prints until someone gets sliced and the red goes everywhere.",
      "If you've seen Kill Bill, you'll recognise a lot here. This is the original pressing."
    ],
    bestMoment: "Any shot of Kaji walking through falling snow with an umbrella. Iconic.",
    watchIf: "You like your revenge served very, very cold."
  },
  {
    slug: "the-street-fighter",
    title: "The Street Fighter",
    year: 1974,
    country: "Japan",
    director: "Shigehiro Ozawa",
    starring: "Sonny Chiba",
    category: "classic",
    craft: 3.5, fun: 5,
    tagline: "He doesn't fight fair. Neither does the movie.",
    colors: ["#111111", "#3a0a0a", "#ff2a2a"],
    layout: 3,
    poster: "images/the-street-fighter-poster.jpg",
    staffPick: false,
    verdict: "The meanest man on the shelf, and proud of it.",
    review: [
      "Sonny Chiba plays a mercenary with no friends, no morals and no interest in fighting fair. He growls, he snarls, he does things to his opponents that made this one notorious when it hit American theaters.",
      "The plot is a tangle of yakuza and kidnapping schemes that you can safely ignore. The point is Chiba, who fights like a cornered animal and somehow makes it charismatic.",
      "It's grimy, mean-spirited and wildly entertaining. Not for the faint of heart — or the faint of skull."
    ],
    bestMoment: "The x-ray shot. You'll know it when you see it.",
    watchIf: "You found Bruce Lee a bit too polite."
  },
  {
    slug: "master-of-the-flying-guillotine",
    title: "Master of the Flying Guillotine",
    year: 1976,
    country: "Taiwan",
    director: "Jimmy Wang Yu",
    starring: "Jimmy Wang Yu, Kam Kong",
    category: "classic",
    craft: 3.5, fun: 5,
    tagline: "Keep your head.",
    colors: ["#ff8a00", "#2a0b3d", "#ffe600"],
    layout: 1,
    poster: "images/master-of-the-flying-guillotine-poster.jpg",
    staffPick: false,
    verdict: "A one-armed hero, a blind assassin and a hat that decapitates people. Perfect.",
    review: [
      "The One-Armed Boxer is back, and this time a blind master hunts him with a weapon that's basically a bladed beekeeper hat on a chain. It's as ridiculous as it sounds and twice as fun.",
      "The middle stretch is a tournament packed with wonderfully strange fighters, including a guy with extendable arms and a Muay Thai brawler who fights on a hot plate.",
      "Craft? Wobbly. Pure entertainment value? Off the charts. A Saturday-night rental if ever there was one."
    ],
    bestMoment: "The guillotine's first flight. You won't believe your eyes, and neither will the victim.",
    watchIf: "You like your villains blind, angry and armed with headwear."
  },
  {
    slug: "ong-bak",
    title: "Ong-Bak",
    year: 2003,
    country: "Thailand",
    director: "Prachya Pinkaew",
    starring: "Tony Jaa",
    category: "classic",
    craft: 3.5, fun: 4.5,
    tagline: "No wires. No CGI. No mercy.",
    colors: ["#ffb800", "#4a1b00", "#ffffff"],
    layout: 4,
    poster: "images/ong-bak-poster.jpg",
    staffPick: false,
    verdict: "The plot is thin. The knees are not.",
    review: [
      "A village statue's head gets stolen, and humble Ting heads to Bangkok to get it back. That's the whole story, and the movie knows it — it's an excuse for Tony Jaa to do things the human body shouldn't do.",
      "The selling point was no wires and no CGI, and it shows: the Muay Thai is bone-crunchingly real, and the chase scenes turn Bangkok streets into an obstacle course.",
      "The movie even replays its best stunts from multiple angles, just in case you didn't believe it the first time."
    ],
    bestMoment: "The street chase, with Jaa sliding, leaping and vaulting over anything in his path.",
    watchIf: "You want to see someone fight with their elbows on fire. Literally."
  },
  {
    slug: "the-raid",
    title: "The Raid",
    year: 2011,
    country: "Indonesia",
    director: "Gareth Evans",
    starring: "Iko Uwais, Yayan Ruhian",
    category: "classic",
    craft: 5, fun: 5,
    tagline: "One building. Thirty floors. No way out.",
    colors: ["#2d3a3a", "#0b0f10", "#ff3b1f"],
    layout: 3,
    poster: "images/the-raid-poster.jpg",
    staffPick: true,
    verdict: "A modern classic that shoved pencak silat onto the world stage.",
    review: [
      "A police squad storms a tower block run by a crime lord, and it goes wrong immediately. What follows is basically ninety minutes of the hardest-hitting action of its decade.",
      "Iko Uwais fights in tight hallways, stairwells and apartments, and the choreography makes every room feel like a deathtrap. The camera always knows exactly where to be.",
      "It's relentless and exhausting in the best way. You will need a nap after."
    ],
    bestMoment: "Mad Dog. Two against one. That's all you're getting.",
    watchIf: "You want to see the bar for action movies get raised."
  },
  {
    slug: "police-story-2",
    title: "Police Story 2",
    year: 1988,
    country: "Hong Kong",
    director: "Jackie Chan",
    starring: "Jackie Chan, Maggie Cheung, Bill Tung",
    category: "classic",
    craft: 4.5, fun: 4.5,
    tagline: "He's been demoted. He's not been defeated.",
    colors: ["#ff6a00", "#1a1f4a", "#ffffff"],
    layout: 3,
    poster: "images/police-story-2-poster.jpg",
    staffPick: false,
    verdict: "A sequel that trades the bus stunt for a playground brawl and a fireworks factory, and somehow comes out swinging even.",
    review: [
      "Kevin Chan Ka-kui is back, busted down to traffic duty after the chaos of the first film, with the crime boss he put away now out and making his life miserable. Then a gang of bombers starts extorting the city, and the demotion stops mattering very fast.",
      "Jackie directs as well as stars, and the action is built like clockwork: a playground fight that turns monkey bars and slides into weapons, a restaurant scrap, and a finale in a fireworks factory where everything that can explode does. Maggie Cheung gets more to do this time, and her frustration with a boyfriend who keeps cancelling dates to get blown up is half the charm.",
      "It's longer and talkier between the set pieces than the original. But when it kicks off, it's Jackie at the absolute peak of his powers, and the outtakes alone are worth the rental fee."
    ],
    bestMoment: "The playground fight. Every piece of equipment becomes a weapon or an escape route.",
    watchIf: "You've seen Police Story and want to watch Jackie get hurt in brand-new ways."
  },
  {
    slug: "heart-of-dragon",
    title: "Heart of Dragon",
    year: 1985,
    country: "Hong Kong",
    director: "Sammo Hung",
    starring: "Jackie Chan, Sammo Hung, Emily Chu",
    category: "classic",
    craft: 5, fun: 5,
    tagline: "Some fights are for family.",
    colors: ["#c8102e", "#1a0a05", "#ffd166"],
    layout: 2,
    poster: "images/heart-of-dragon-poster.jpg",
    staffPick: false,
    verdict: "The most surprising tape in the store: a family drama first, a kung fu movie second, and better at both than it has any right to be.",
    review: [
      "Jackie plays Ted, a cop who dreams of sailing the world but can't, because he's the sole carer for his older brother Dodo, played by Sammo Hung, who has an intellectual disability. When Dodo gets tangled up with a gang of thieves, Ted has to choose between the life he wants and the brother he loves.",
      "Fans expecting wall-to-wall action got a shock in 1985, because this is mostly a drama, and a genuinely affecting one. Sammo directs with real tenderness and gives himself the hardest role of his career. Jackie, playing the straight man for once, is quietly excellent.",
      "Then the finale arrives, a construction-site showdown that is as good as anything either of them ever shot, and it lands twice as hard because you care about these brothers. Some of the 80s comedy around Dodo hasn't aged gracefully (more on that at the Golden Blurgs), but the heart of it is real. A five-star rental."
    ],
    bestMoment: "The construction-site finale: Jackie at full speed with everything on the line.",
    watchIf: "You want a Jackie Chan movie that might make you cry before it makes you wince."
  },
  {
    slug: "miami-connection",
    title: "Miami Connection",
    year: 1987,
    country: "USA",
    director: "Richard Park",
    starring: "Y.K. Kim",
    category: "bad",
    craft: 1, fun: 5,
    tagline: "Taekwondo. Synth rock. Friendship.",
    colors: ["#ff4fb3", "#2a0a5e", "#2ef2ff"],
    layout: 1,
    poster: "images/miami-connection-poster.jpg",
    staffPick: true,
    verdict: "The most sincere bad movie ever made. It will melt your heart and your brain.",
    review: [
      "A taekwondo-practicing synth-rock band of orphaned college roommates takes on a cocaine empire of motorcycle ninjas. That's not a joke. That's the plot.",
      "The acting is wooden, the fights are clumsy and the dialogue sounds like it was translated twice. But it's made with so much heart and so much conviction that you end up rooting for every one of these guys.",
      "It flopped on release and was rescued decades later by repertory screenings, and now it's a cult treasure. Gather your friends. That's the whole message of the movie anyway."
    ],
    bestMoment: "Any time the band, Dragon Sound, takes the stage.",
    watchIf: "You believe in friendship, taekwondo and the power of a good keytar."
  },
  {
    slug: "for-yur-height-only",
    title: "For Y'ur Height Only",
    year: 1981,
    country: "Philippines",
    director: "Eddie Nicart",
    starring: "Weng Weng",
    category: "bad",
    craft: 1.5, fun: 5,
    tagline: "Agent 00. Licensed to kick.",
    colors: ["#1b6ef3", "#061a3d", "#ffd400"],
    layout: 2,
    poster: "images/for-yur-height-only-poster.jpg",
    staffPick: true,
    verdict: "The secret agent the world didn't know it needed.",
    review: [
      "Weng Weng plays Agent 00, a pint-sized super spy with a hat, a gun and a jetpack-style umbrella, taking down a drug syndicate with flying kicks to the groin.",
      "The English dub is gloriously bizarre and the gadgets look homemade. But Weng Weng commits to every stunt, and his deadpan cool is genuinely endearing.",
      "A riff on James Bond that ends up being more fun than half the real ones."
    ],
    bestMoment: "The umbrella escape. Physics is not invited.",
    watchIf: "You think Bond movies need more groin kicks."
  },
  {
    slug: "robo-vampire",
    title: "Robo Vampire",
    year: 1988,
    country: "Hong Kong",
    director: "Godfrey Ho",
    starring: "Robin Mackay, Nian Peng",
    category: "bad",
    craft: 0.5, fun: 4,
    tagline: "Part robot. Part cop. All confusing.",
    colors: ["#9cff3a", "#0b1d05", "#c0c0c0"],
    layout: 4,
    poster: "images/robo-vampire-poster.jpg",
    staffPick: false,
    verdict: "Two movies stapled together and a robot suit made from cardboard dreams.",
    review: [
      "A drug lord uses hopping vampires to protect his heroin shipments, so the authorities do the obvious thing and build a robot cop. Meanwhile, a completely different movie seems to be happening in the jungle.",
      "This is classic cut-and-paste filmmaking: footage from separate productions edited together until the plot gives up. The 'Robo' costume looks like it would lose a fight with a strong breeze.",
      "Incoherent? Totally. Boring? Never. This is a cult rental for a reason."
    ],
    bestMoment: "The first time Robo shows up and you realise they're serious.",
    watchIf: "You've ever wanted RoboCop to fight a hopping vampire."
  },
  {
    slug: "the-dragon-lives-again",
    title: "The Dragon Lives Again",
    year: 1977,
    country: "Hong Kong",
    director: "Law Kei",
    starring: "Bruce Leung",
    category: "bad",
    craft: 1, fun: 4.5,
    tagline: "Death was just round one.",
    colors: ["#ff2d2d", "#1a0000", "#ffd84a"],
    layout: 3,
    poster: "images/the-dragon-lives-again-poster.jpg",
    staffPick: false,
    verdict: "Bruceploitation goes to the afterlife, and brings a lot of unlicensed friends.",
    review: [
      "After his death, 'Bruce Lee' wakes up in the underworld and has to fight off a cast of suspiciously familiar pop-culture villains who are definitely not who they look like. Lawyers, look away.",
      "It's a cheap, weird, often baffling piece of Bruceploitation, but it's so earnest in its insanity that you can't help but enjoy it. Bruce Leung's kicks are actually pretty great.",
      "There's also a sailor ally who eats a certain leafy green. Just roll with it."
    ],
    bestMoment: "The underworld king's reaction to meeting Bruce.",
    watchIf: "You think the afterlife should have more roundhouse kicks."
  },
  {
    slug: "clones-of-bruce-lee",
    title: "The Clones of Bruce Lee",
    year: 1980,
    country: "Hong Kong",
    director: "Joseph Kong",
    starring: "Dragon Lee, Bruce Le, Bruce Thai",
    category: "bad",
    craft: 1, fun: 4,
    tagline: "One Bruce wasn't enough.",
    colors: ["#ffe600", "#e0185f", "#111111"],
    layout: 1,
    poster: "images/clones-of-bruce-lee-poster.jpg",
    staffPick: false,
    verdict: "Mad science meets Bruceploitation, and science loses.",
    review: [
      "Scientists clone Bruce Lee and send three copies out on secret missions. Each clone is played by a different Bruce Lee lookalike, which is the most efficient Bruceploitation idea ever.",
      "The science is nonsense, the villains are cartoonish and there's a subplot about bronze men. But the fights are frequent and the stars are genuinely talented.",
      "It's the ultimate artifact of an era when the market just couldn't get enough Bruce."
    ],
    bestMoment: "The clones getting their 'programming.' Scientific accuracy: zero.",
    watchIf: "You've ever thought 'needs more Bruces.'"
  }
];
