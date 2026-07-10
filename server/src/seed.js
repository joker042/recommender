import pool from './src/db.js';

// =============================================================================
// TAGS
// =============================================================================
const tags = [
  // Genre
  { name: 'sci-fi', category: 'genre' },
  { name: 'fantasy', category: 'genre' },
  { name: 'drama', category: 'genre' },
  { name: 'comedy', category: 'genre' },
  { name: 'thriller', category: 'genre' },
  { name: 'horror', category: 'genre' },
  { name: 'action', category: 'genre' },
  { name: 'adventure', category: 'genre' },
  { name: 'romance', category: 'genre' },
  { name: 'mystery', category: 'genre' },
  { name: 'crime', category: 'genre' },
  { name: 'documentary', category: 'genre' },
  { name: 'animation', category: 'genre' },
  { name: 'musical', category: 'genre' },
  { name: 'western', category: 'genre' },
  { name: 'war', category: 'genre' },
  { name: 'historical', category: 'genre' },
  { name: 'superhero', category: 'genre' },
  { name: 'noir', category: 'genre' },
  { name: 'psychological', category: 'genre' },
  { name: 'satire', category: 'genre' },
  { name: 'supernatural', category: 'genre' },
  { name: 'spy', category: 'genre' },
  { name: 'family', category: 'genre' },
  { name: 'teen', category: 'genre' },
  { name: 'sports', category: 'genre' },
  { name: 'cooking', category: 'genre' },
  { name: 'reality', category: 'genre' },
  { name: 'game-show', category: 'genre' },
  { name: 'talk-show', category: 'genre' },
  { name: 'news', category: 'genre' },
  { name: 'educational', category: 'genre' },
  { name: 'nature', category: 'genre' },
  { name: 'medical', category: 'genre' },
  { name: 'legal', category: 'genre' },
  { name: 'political', category: 'genre' },
  { name: 'period', category: 'genre' },
  { name: 'cyberpunk', category: 'genre' },
  { name: 'dystopian', category: 'genre' },
  { name: 'post-apocalyptic', category: 'genre' },
  { name: 'martial-arts', category: 'genre' },
  { name: 'survival', category: 'genre' },
  { name: 'heist', category: 'genre' },
  { name: 'courtroom', category: 'genre' },
  { name: 'road-trip', category: 'genre' },
  { name: 'anthology', category: 'genre' },
  { name: 'mockumentary', category: 'genre' },
  { name: 'slapstick', category: 'genre' },
  { name: 'dark-comedy', category: 'genre' },
  { name: 'rom-com', category: 'genre' },
  { name: 'dramedy', category: 'genre' },
  { name: 'coming-of-age', category: 'genre' },
  { name: 'buddy', category: 'genre' },
  { name: 'procedural', category: 'genre' },
  { name: 'serialized', category: 'genre' },
  { name: 'experimental', category: 'genre' },

  // Theme
  { name: 'time-travel', category: 'theme' },
  { name: 'artificial-intelligence', category: 'theme' },
  { name: 'parallel-universe', category: 'theme' },
  { name: 'space-exploration', category: 'theme' },
  { name: 'robots', category: 'theme' },
  { name: 'clones', category: 'theme' },
  { name: 'aliens', category: 'theme' },
  { name: 'dinosaurs', category: 'theme' },
  { name: 'magic', category: 'theme' },
  { name: 'vampires', category: 'theme' },
  { name: 'werewolves', category: 'theme' },
  { name: 'zombies', category: 'theme' },
  { name: 'ghosts', category: 'theme' },
  { name: 'demons', category: 'theme' },
  { name: 'witches', category: 'theme' },
  { name: 'gods-and-mythology', category: 'theme' },
  { name: 'conspiracy', category: 'theme' },
  { name: 'cult', category: 'theme' },
  { name: 'prison', category: 'theme' },
  { name: 'school', category: 'theme' },
  { name: 'workplace', category: 'theme' },
  { name: 'small-town', category: 'theme' },
  { name: 'big-city', category: 'theme' },
  { name: 'road-trip', category: 'theme' },
  { name: 'heist', category: 'theme' },
  { name: 'survival', category: 'theme' },
  { name: 'immortality', category: 'theme' },
  { name: 'reincarnation', category: 'theme' },
  { name: 'memory', category: 'theme' },
  { name: 'identity', category: 'theme' },
  { name: 'family-dynamics', category: 'theme' },
  { name: 'politics', category: 'theme' },
  { name: 'war', category: 'theme' },
  { name: 'revolution', category: 'theme' },
  { name: 'espionage', category: 'theme' },
  { name: 'hacking', category: 'theme' },
  { name: 'gaming', category: 'theme' },
  { name: 'music-industry', category: 'theme' },
  { name: 'hollywood', category: 'theme' },
  { name: 'fashion', category: 'theme' },
  { name: 'food', category: 'theme' },
  { name: 'sports', category: 'theme' },
  { name: 'medicine', category: 'theme' },
  { name: 'law', category: 'theme' },
  { name: 'business', category: 'theme' },
  { name: 'journalism', category: 'theme' },
  { name: 'traveling', category: 'theme' },
  { name: 'fishing', category: 'theme' },
  { name: 'hunting', category: 'theme' },
  { name: 'farming', category: 'theme' },
  { name: 'royalty', category: 'theme' },
  { name: 'pirates', category: 'theme' },
  { name: 'ninjas', category: 'theme' },
  { name: 'samurai', category: 'theme' },
  { name: 'vikings', category: 'theme' },
  { name: 'mafia', category: 'theme' },
  { name: 'dystopia', category: 'theme' },
  { name: 'utopia', category: 'theme' },
  { name: 'apocalypse', category: 'theme' },
  { name: 'superhero-origin', category: 'theme' },
  { name: 'secret-identity', category: 'theme' },
  { name: 'found-family', category: 'theme' },
  { name: 'redemption', category: 'theme' },
  { name: 'revenge', category: 'theme' },
  { name: 'betrayal', category: 'theme' },
  { name: 'sacrifice', category: 'theme' },
  { name: 'power-struggle', category: 'theme' },
  { name: 'corruption', category: 'theme' },
  { name: 'justice', category: 'theme' },
  { name: 'freedom', category: 'theme' },
  { name: 'oppression', category: 'theme' },
  { name: 'rebellion', category: 'theme' },
  { name: 'discovery', category: 'theme' },
  { name: 'invention', category: 'theme' },
  { name: 'exploration', category: 'theme' },
  { name: 'colonization', category: 'theme' },
  { name: 'first-contact', category: 'theme' },
  { name: 'alien-invasion', category: 'theme' },

  // Mood
  { name: 'dark', category: 'mood' },
  { name: 'lighthearted', category: 'mood' },
  { name: 'feel-good', category: 'mood' },
  { name: 'intense', category: 'mood' },
  { name: 'melancholic', category: 'mood' },
  { name: 'quirky', category: 'mood' },
  { name: 'hopeful', category: 'mood' },
  { name: 'bleak', category: 'mood' },
  { name: 'suspenseful', category: 'mood' },
  { name: 'thrilling', category: 'mood' },
  { name: 'cozy', category: 'mood' },
  { name: 'whimsical', category: 'mood' },
  { name: 'gritty', category: 'mood' },
  { name: 'epic', category: 'mood' },
  { name: 'intimate', category: 'mood' },
  { name: 'chaotic', category: 'mood' },
  { name: 'calm', category: 'mood' },
  { name: 'nostalgic', category: 'mood' },
  { name: 'bittersweet', category: 'mood' },
  { name: 'uplifting', category: 'mood' },
  { name: 'disturbing', category: 'mood' },
  { name: 'warm', category: 'mood' },
  { name: 'cold', category: 'mood' },
  { name: 'eerie', category: 'mood' },
  { name: 'tense', category: 'mood' },
  { name: 'relaxing', category: 'mood' },
  { name: 'funny', category: 'mood' },
  { name: 'serious', category: 'mood' },
  { name: 'dramatic', category: 'mood' },
  { name: 'inspirational', category: 'mood' },

  // Style
  { name: 'ensemble-cast', category: 'style' },
  { name: 'anthology', category: 'style' },
  { name: 'slow-burn', category: 'style' },
  { name: 'nonlinear', category: 'style' },
  { name: 'unreliable-narrator', category: 'style' },
  { name: 'multiple-timelines', category: 'style' },
  { name: 'voiceover', category: 'style' },
  { name: 'breaking-fourth-wall', category: 'style' },
  { name: 'single-camera', category: 'style' },
  { name: 'multi-camera', category: 'style' },
  { name: 'found-footage', category: 'style' },
  { name: 'documentary-style', category: 'style' },
  { name: 'animated', category: 'style' },
  { name: 'live-action', category: 'style' },
  { name: 'cgi', category: 'style' },
  { name: 'practical-effects', category: 'style' },
  { name: 'black-and-white', category: 'style' },
  { name: 'silent', category: 'style' },
  { name: 'musical-numbers', category: 'style' },
  { name: 'dance-numbers', category: 'style' },
  { name: 'fight-scenes', category: 'style' },
  { name: 'car-chases', category: 'style' },
  { name: 'explosions', category: 'style' },
  { name: 'special-effects', category: 'style' },
  { name: 'practical-jokes', category: 'style' },
  { name: 'cliffhangers', category: 'style' },
  { name: 'flashbacks', category: 'style' },
  { name: 'flash-forwards', category: 'style' },
  { name: 'dream-sequence', category: 'style' },
  { name: 'twist-ending', category: 'style' },
  { name: 'open-ending', category: 'style' },
  { name: 'serialized', category: 'style' },
  { name: 'episodic', category: 'style' },
  { name: 'procedural', category: 'style' },
  { name: 'standalone', category: 'style' },
  { name: 'mini-series', category: 'style' },
  { name: 'limited-series', category: 'style' },
  { name: 'ongoing', category: 'style' },
  { name: 'reboot', category: 'style' },
  { name: 'remake', category: 'style' },
  { name: 'spin-off', category: 'style' },
  { name: 'crossover', category: 'style' },
  { name: 'prequel', category: 'style' },
  { name: 'sequel', category: 'style' },
  { name: 'midquel', category: 'style' },

  // Era
  { name: '1950s', category: 'era' },
  { name: '1960s', category: 'era' },
  { name: '1970s', category: 'era' },
  { name: '1980s', category: 'era' },
  { name: '1990s', category: 'era' },
  { name: '2000s', category: 'era' },
  { name: '2010s', category: 'era' },
  { name: '2020s', category: 'era' },
  { name: 'pre-1900s', category: 'era' },
  { name: 'edwardian', category: 'era' },
  { name: 'victorian', category: 'era' },
  { name: 'medieval', category: 'era' },
  { name: 'ancient', category: 'era' },
  { name: 'prehistoric', category: 'era' },
  { name: 'future', category: 'era' },
  { name: 'retro-future', category: 'era' },
  { name: 'near-future', category: 'era' },
  { name: 'far-future', category: 'era' },
  { name: 'contemporary', category: 'era' },
  { name: 'period-piece', category: 'era' },

  // Format
  { name: 'series', category: 'format' },
  { name: 'mini-series', category: 'format' },
  { name: 'limited-series', category: 'format' },
  { name: 'movie', category: 'format' },
  { name: 'short-film', category: 'format' },
  { name: 'special', category: 'format' },
  { name: 'documentary', category: 'format' },
  { name: 'feature-film', category: 'format' },
  { name: 'serial', category: 'format' },
  { name: 'anthology', category: 'format' },
  { name: 'episode', category: 'format' },
  { name: 'season', category: 'format' },
  { name: 'pilot', category: 'format' },
  { name: 'finale', category: 'format' },
  { name: 'one-shot', category: 'format' },
  { name: 'ongoing', category: 'format' },
  { name: 'cancelled', category: 'format' },
  { name: 'renewed', category: 'format' },
  { name: 'returning', category: 'format' },
  { name: 'new', category: 'format' },
];

// =============================================================================
// SHOWS (200 well-known TV shows and movies)
// =============================================================================
const shows = [
  // ---------- MOVIES (80) ----------
  {
    title: 'The Godfather', type: 'movie', year: 1972,
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.',
    tags: ['crime', 'drama', 'mafia', 'family-dynamics', 'power-struggle', 'betrayal'],
    weights: [1.0, 1.0, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Shawshank Redemption', type: 'movie', year: 1994,
    synopsis: 'A banker convicted of murdering his wife forms an unlikely friendship with a fellow inmate while maintaining hope inside a corrupt prison.',
    tags: ['drama', 'prison', 'justice', 'redemption', 'hope', 'friendship'],
    weights: [1.0, 0.9, 0.9, 1.0, 1.0, 0.8],
  },
  {
    title: 'Pulp Fiction', type: 'movie', year: 1994,
    synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in a series of violent and darkly comedic vignettes.',
    tags: ['crime', 'drama', 'dark-comedy', 'nonlinear', 'ensemble-cast'],
    weights: [1.0, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Dark Knight', type: 'movie', year: 2008,
    synopsis: 'When the Joker unleashes chaos on Gotham, Batman must confront the limits of his heroic code and the nature of justice.',
    tags: ['action', 'superhero', 'crime', 'thriller', 'justice', 'corruption'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.8, 0.7],
  },
  {
    title: 'Schindler\'s List', type: 'movie', year: 1993,
    synopsis: 'In Nazi-occupied Poland, industrialist Oskar Schindler gradually saves over a thousand Jewish refugees from the Holocaust.',
    tags: ['drama', 'war', 'historical', 'sacrifice', 'redemption'],
    weights: [1.0, 1.0, 1.0, 0.9, 0.9],
  },
  {
    title: 'Forrest Gump', type: 'movie', year: 1994,
    synopsis: 'The extraordinary life story of a simple but kind-hearted man from Alabama who witnesses and influences pivotal moments in American history.',
    tags: ['drama', 'comedy', 'romance', 'coming-of-age', 'nostalgic'],
    weights: [0.9, 0.6, 0.7, 0.8, 0.9],
  },
  {
    title: 'Inception', type: 'movie', year: 2010,
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into a CEO\'s mind.',
    tags: ['sci-fi', 'action', 'thriller', 'dream-sequence', 'nonlinear', 'memory'],
    weights: [1.0, 0.8, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'The Matrix', type: 'movie', year: 1999,
    synopsis: 'A computer hacker learns that his reality is a simulated construct created by machines and joins a rebellion to free humanity.',
    tags: ['sci-fi', 'action', 'cyberpunk', 'dystopian', 'artificial-intelligence', 'simulation'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'Goodfellas', type: 'movie', year: 1990,
    synopsis: 'The rise and fall of a real-life mob associate chronicled through three decades of violence, loyalty, and betrayal in the New York mafia.',
    tags: ['crime', 'drama', 'mafia', 'betrayal', 'gritty', 'voiceover'],
    weights: [1.0, 0.9, 1.0, 0.8, 0.9, 0.7],
  },
  {
    title: 'Fight Club', type: 'movie', year: 1999,
    synopsis: 'An insomniac office worker and a charismatic soap maker form an underground fight club that evolves into a dangerous anarchist movement.',
    tags: ['drama', 'thriller', 'psychological', 'twist-ending', 'identity', 'rebellion'],
    weights: [0.9, 0.8, 1.0, 1.0, 0.9, 0.8],
  },
  {
    title: 'Star Wars: A New Hope', type: 'movie', year: 1977,
    synopsis: 'A young farm boy joins a rebel alliance to save a princess and defeat the evil Galactic Empire with the help of a mystical Jedi knight.',
    tags: ['sci-fi', 'adventure', 'action', 'space-exploration', 'epic'],
    weights: [1.0, 1.0, 0.8, 0.9, 1.0],
  },
  {
    title: 'Jurassic Park', type: 'movie', year: 1993,
    synopsis: 'A paleontologist and a group of visitors struggle to survive when cloned dinosaurs break loose on a remote island theme park.',
    tags: ['sci-fi', 'adventure', 'thriller', 'dinosaurs', 'survival'],
    weights: [0.9, 0.9, 0.8, 1.0, 0.8],
  },
  {
    title: 'The Silence of the Lambs', type: 'movie', year: 1991,
    synopsis: 'A young FBI cadet seeks the help of an incarcerated cannibalistic psychiatrist to catch another serial killer on the loose.',
    tags: ['thriller', 'horror', 'crime', 'psychological', 'suspenseful'],
    weights: [1.0, 0.8, 0.9, 0.9, 1.0],
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring', type: 'movie', year: 2001,
    synopsis: 'A gentle hobbit and eight companions set out on an epic journey to destroy a powerful ring and save Middle-earth from the Dark Lord Sauron.',
    tags: ['fantasy', 'adventure', 'epic', 'fellowship', 'sacrifice'],
    weights: [1.0, 1.0, 1.0, 0.8, 0.7],
  },
  {
    title: 'Saving Private Ryan', type: 'movie', year: 1998,
    synopsis: 'During the Normandy invasion, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
    tags: ['war', 'drama', 'action', 'sacrifice', 'gritty'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.9],
  },
  {
    title: 'Parasite', type: 'movie', year: 2019,
    synopsis: 'A poor Korean family schemes to infiltrate a wealthy household, leading to unexpected and devastating consequences.',
    tags: ['drama', 'thriller', 'dark-comedy', 'class-struggle', 'twist-ending'],
    weights: [1.0, 0.8, 0.8, 1.0, 0.9],
  },
  {
    title: 'Interstellar', type: 'movie', year: 2014,
    synopsis: 'A team of explorers travels through a wormhole in space to find a new habitable planet as Earth faces environmental collapse.',
    tags: ['sci-fi', 'adventure', 'space-exploration', 'survival', 'time-dilation'],
    weights: [1.0, 0.8, 1.0, 0.7, 0.8],
  },
  {
    title: 'Gladiator', type: 'movie', year: 2000,
    synopsis: 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.',
    tags: ['action', 'drama', 'historical', 'ancient', 'revenge', 'epic'],
    weights: [0.9, 0.9, 0.9, 1.0, 0.9, 0.9],
  },
  {
    title: 'The Departed', type: 'movie', year: 2006,
    synopsis: 'An undercover cop and a mole in the police force each attempt to identify the other while infiltrating a Boston crime syndicate.',
    tags: ['crime', 'thriller', 'drama', 'betrayal', 'espionage', 'gritty'],
    weights: [1.0, 1.0, 0.8, 0.9, 0.8, 0.8],
  },
  {
    title: 'Whiplash', type: 'movie', year: 2014,
    synopsis: 'A promising young drummer enrolls at a cutthroat music conservatory where his perfectionist instructor will stop at nothing to push him.',
    tags: ['drama', 'music-industry', 'intense', 'psychological'],
    weights: [0.9, 0.9, 1.0, 0.8],
  },
  {
    title: 'The Prestige', type: 'movie', year: 2006,
    synopsis: 'Two rival stage magicians in Victorian London engage in a bitter and deadly feud to create the ultimate illusion.',
    tags: ['drama', 'mystery', 'thriller', 'twist-ending', 'victorian', 'obsession'],
    weights: [0.9, 0.9, 0.8, 1.0, 0.7, 0.8],
  },
  {
    title: 'The Social Network', type: 'movie', year: 2010,
    synopsis: 'Mark Zuckerberg creates Facebook and faces lawsuits from former friends and business partners over the invention of the social network.',
    tags: ['drama', 'technology', 'business', 'betrayal'],
    weights: [0.9, 0.8, 0.9, 0.8],
  },
  {
    title: 'Spirited Away', type: 'anime', year: 2001,
    synopsis: 'A young girl enters a mysterious spirit world after her parents are transformed into pigs, and she must work in a magical bathhouse to survive.',
    tags: ['animation', 'fantasy', 'coming-of-age', 'whimsical', 'magic'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.8],
  },
  {
    title: 'Coco', type: 'movie', year: 2017,
    synopsis: 'Aspiring musician Miguel enters the Land of the Dead to find his great-great-grandfather and uncover his family\'s long-buried musical history.',
    tags: ['animation', 'family', 'music-industry', 'ghosts', 'family-dynamics'],
    weights: [1.0, 1.0, 0.8, 0.7, 0.9],
  },
  {
    title: 'Eternal Sunshine of the Spotless Mind', type: 'movie', year: 2004,
    synopsis: 'A couple undergoes a medical procedure to erase each other from their memories after their relationship turns sour.',
    tags: ['romance', 'sci-fi', 'drama', 'memory', 'nonlinear', 'bittersweet'],
    weights: [0.8, 0.7, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Mad Max: Fury Road', type: 'movie', year: 2015,
    synopsis: 'In a post-apocalyptic wasteland, a drifter and a rebel warrior team up to escape a tyrannical warlord and his army in a high-speed chase.',
    tags: ['action', 'sci-fi', 'post-apocalyptic', 'dystopian', 'survival'],
    weights: [1.0, 0.8, 1.0, 0.9, 0.8],
  },
  {
    title: 'Blade Runner 2049', type: 'movie', year: 2017,
    synopsis: 'A new blade runner uncovers a long-buried secret that could plunge what remains of society into chaos.',
    tags: ['sci-fi', 'cyberpunk', 'dystopian', 'artificial-intelligence', 'identity'],
    weights: [1.0, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'No Country for Old Men', type: 'movie', year: 2007,
    synopsis: 'A hunter stumbles upon a drug deal gone wrong and takes a case of cash, setting off a violent chain reaction in the Texas desert.',
    tags: ['thriller', 'crime', 'drama', 'gritty', 'bleak'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.9],
  },
  {
    title: 'The Grand Budapest Hotel', type: 'movie', year: 2014,
    synopsis: 'A legendary concierge at a famous European hotel befriends a young lobby boy and becomes entangled in a murder and art theft mystery.',
    tags: ['comedy', 'drama', 'quirky', 'ensemble-cast', 'period-piece'],
    weights: [0.8, 0.7, 1.0, 0.8, 0.8],
  },
  {
    title: 'There Will Be Blood', type: 'movie', year: 2007,
    synopsis: 'A silver miner turned oil tycoon descends into greed and madness while competing with a young evangelical preacher in early 20th-century California.',
    tags: ['drama', 'historical', 'business', 'power-struggle', 'corruption'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.8],
  },
  {
    title: 'Get Out', type: 'movie', year: 2017,
    synopsis: 'A young Black man discovers disturbing secrets when he visits his white girlfriend\'s family estate for the weekend.',
    tags: ['horror', 'thriller', 'psychological', 'social-commentary', 'suspenseful'],
    weights: [0.9, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Truman Show', type: 'movie', year: 1998,
    synopsis: 'An insurance salesman discovers his entire life is a reality TV show broadcast to millions, and he decides to escape.',
    tags: ['comedy', 'drama', 'satire', 'reality-tv', 'existential'],
    weights: [0.7, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'Pan\'s Labyrinth', type: 'movie', year: 2006,
    synopsis: 'In Francoist Spain, a young girl escapes into a dark fairy tale world while her brutal stepfather hunts rebels in the mountains.',
    tags: ['fantasy', 'drama', 'war', 'magic', 'dark', 'period-piece'],
    weights: [0.9, 0.9, 0.7, 0.8, 0.8, 0.8],
  },
  {
    title: 'Amélie', type: 'movie', year: 2001,
    synopsis: 'A shy waitress in Paris decides to secretly improve the lives of people around her while struggling with her own isolation.',
    tags: ['comedy', 'romance', 'quirky', 'whimsical', 'feel-good', 'big-city'],
    weights: [0.7, 0.8, 1.0, 0.9, 0.9, 0.6],
  },
  {
    title: 'Oldboy', type: 'movie', year: 2003,
    synopsis: 'A man is mysteriously imprisoned for 15 years and then released, setting him on a quest for vengeance that uncovers shocking secrets.',
    tags: ['thriller', 'mystery', 'action', 'revenge', 'twist-ending', 'psychological'],
    weights: [1.0, 0.8, 0.7, 1.0, 1.0, 0.9],
  },
  {
    title: 'Arrival', type: 'movie', year: 2016,
    synopsis: 'A linguist is recruited by the military to communicate with mysterious alien visitors and decipher their language and intentions.',
    tags: ['sci-fi', 'drama', 'aliens', 'first-contact', 'nonlinear', 'language'],
    weights: [1.0, 0.9, 1.0, 1.0, 0.8, 0.8],
  },
  {
    title: 'Jaws', type: 'movie', year: 1975,
    synopsis: 'A giant man-eating great white shark attacks beachgoers on Amity Island, forcing the local sheriff to team up with a marine biologist and a shark hunter.',
    tags: ['thriller', 'horror', 'adventure', 'survival', 'suspenseful'],
    weights: [0.9, 0.8, 0.7, 0.8, 1.0],
  },
  {
    title: 'Alien', type: 'movie', year: 1979,
    synopsis: 'The crew of a commercial spaceship encounters a deadly extraterrestrial creature after investigating a mysterious transmission.',
    tags: ['sci-fi', 'horror', 'aliens', 'survival', 'space-exploration'],
    weights: [1.0, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Back to the Future', type: 'movie', year: 1985,
    synopsis: 'A teenager is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his eccentric scientist friend.',
    tags: ['sci-fi', 'adventure', 'comedy', 'time-travel', 'nostalgic'],
    weights: [0.9, 0.9, 0.8, 1.0, 0.8],
  },
  {
    title: 'Raiders of the Lost Ark', type: 'movie', year: 1981,
    synopsis: 'Archaeologist Indiana Jones races against Nazis to find the biblical Ark of the Covenant before they can harness its ancient power.',
    tags: ['adventure', 'action', 'historical', 'artifacts', 'thrilling'],
    weights: [1.0, 0.9, 0.7, 0.8, 0.9],
  },
  {
    title: 'Die Hard', type: 'movie', year: 1988,
    synopsis: 'A New York cop solo battles a group of terrorists who have taken over a Los Angeles skyscraper during a Christmas party.',
    tags: ['action', 'thriller', 'survival', 'heist'],
    weights: [1.0, 0.9, 0.7, 0.6],
  },
  {
    title: 'The Shining', type: 'movie', year: 1980,
    synopsis: 'A writer and his family become the winter caretakers of an isolated hotel where supernatural forces drive him toward madness and violence.',
    tags: ['horror', 'psychological', 'supernatural', 'ghosts', 'eerie', 'isolation'],
    weights: [1.0, 1.0, 0.9, 0.8, 0.9, 0.8],
  },
  {
    title: 'Taxi Driver', type: 'movie', year: 1976,
    synopsis: 'A mentally unstable Vietnam veteran works as a taxi driver in decaying 1970s New York City and becomes obsessed with cleansing the streets.',
    tags: ['drama', 'crime', 'psychological', 'gritty', 'vigilantism'],
    weights: [1.0, 0.7, 1.0, 0.9, 0.8],
  },
  {
    title: 'Everything Everywhere All at Once', type: 'movie', year: 2022,
    synopsis: 'A Chinese-American laundromat owner must connect with parallel universe versions of herself to save all of existence from chaos.',
    tags: ['sci-fi', 'comedy', 'action', 'parallel-universe', 'family-dynamics', 'chaotic'],
    weights: [0.9, 0.8, 0.8, 1.0, 0.9, 0.8],
  },
  {
    title: 'City of God', type: 'movie', year: 2002,
    synopsis: 'The rise of organized crime in a Rio de Janeiro favela is told through the eyes of a young photographer who dreams of escape.',
    tags: ['crime', 'drama', 'coming-of-age', 'gritty', 'poverty'],
    weights: [1.0, 0.9, 0.8, 1.0, 0.8],
  },
  {
    title: 'Toy Story', type: 'movie', year: 1995,
    synopsis: 'A cowboy doll feels threatened when a new space ranger action figure arrives and competes for the affection of their owner.',
    tags: ['animation', 'family', 'comedy', 'adventure', 'friendship'],
    weights: [1.0, 1.0, 0.8, 0.7, 0.8],
  },
  {
    title: 'The Terminator', type: 'movie', year: 1984,
    synopsis: 'A cyborg assassin is sent from the future to kill a waitress whose unborn son will lead humanity against intelligent machines.',
    tags: ['sci-fi', 'action', 'artificial-intelligence', 'robots', 'time-travel'],
    weights: [1.0, 0.9, 0.9, 0.8, 0.8],
  },
  {
    title: 'The Empire Strikes Back', type: 'movie', year: 1980,
    synopsis: 'The rebels are pursued across the galaxy by the Empire while Luke Skywalker trains with Jedi Master Yoda to control the Force.',
    tags: ['sci-fi', 'adventure', 'sequel', 'space-exploration', 'epic'],
    weights: [1.0, 1.0, 0.9, 0.8, 0.9],
  },
  {
    title: 'Casablanca', type: 'movie', year: 1942,
    synopsis: 'A cynical American expatriate in WWII Casablanca must decide whether to help his former lover and her Czech resistance leader husband.',
    tags: ['drama', 'romance', 'war', 'sacrifice'],
    weights: [0.9, 0.8, 0.8, 0.8],
  },
  {
    title: 'Psycho', type: 'movie', year: 1960,
    synopsis: 'A secretary on the run checks into a remote motel run by a young man with a domineering mother, with fatal consequences.',
    tags: ['horror', 'thriller', 'psychological', 'twist-ending', 'eerie'],
    weights: [1.0, 1.0, 1.0, 1.0, 0.8],
  },
  {
    title: '2001: A Space Odyssey', type: 'movie', year: 1968,
    synopsis: 'Humanity\'s evolution is guided by mysterious monoliths, as a space crew and their AI computer HAL travel toward Jupiter.',
    tags: ['sci-fi', 'experimental', 'artificial-intelligence', 'space-exploration', 'far-future'],
    weights: [1.0, 1.0, 1.0, 0.9, 0.8],
  },
  {
    title: 'Seven Samurai', type: 'movie', year: 1954,
    synopsis: 'A village of farmers hires seven masterless samurai to defend them from bandits who plan to steal their harvest.',
    tags: ['action', 'drama', 'samurai', 'historical', 'epic', 'ensemble-cast'],
    weights: [0.9, 0.9, 1.0, 0.8, 0.8, 0.9],
  },
  {
    title: 'A Clockwork Orange', type: 'movie', year: 1971,
    synopsis: 'A charismatic delinquent undergoes an experimental aversion therapy in a dystopian near-future Britain to cure his violent impulses.',
    tags: ['sci-fi', 'crime', 'dystopian', 'psychological', 'disturbing'],
    weights: [0.9, 0.8, 0.9, 0.9, 1.0],
  },
  {
    title: 'Apocalypse Now', type: 'movie', year: 1979,
    synopsis: 'A U.S. Army captain is sent on a secret mission into Cambodia to assassinate a renegade colonel who has set himself up as a god among locals.',
    tags: ['war', 'drama', 'psychological', 'journey', 'dark'],
    weights: [1.0, 0.9, 0.9, 0.7, 1.0],
  },
  {
    title: 'The Good, the Bad and the Ugly', type: 'movie', year: 1966,
    synopsis: 'Three gunslingers compete to find a fortune in buried Confederate gold during the chaos of the American Civil War.',
    tags: ['western', 'adventure', 'war', 'gold', 'iconic'],
    weights: [1.0, 0.8, 0.6, 0.7, 0.7],
  },
  {
    title: 'One Flew Over the Cuckoo\'s Nest', type: 'movie', year: 1975,
    synopsis: 'A criminal fakes insanity to serve his sentence in a mental institution, where he clashes with the oppressive head nurse.',
    tags: ['drama', 'psychological', 'rebellion', 'oppression'],
    weights: [1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'Léon: The Professional', type: 'movie', year: 1994,
    synopsis: 'A 12-year-old girl is taken in by a solitary hitman after her family is murdered by a corrupt DEA agent, and she seeks to learn his trade.',
    tags: ['action', 'drama', 'crime', 'revenge', 'unlikely-friendship'],
    weights: [0.8, 0.9, 0.8, 0.8, 0.7],
  },
  {
    title: 'The Usual Suspects', type: 'movie', year: 1995,
    synopsis: 'Five criminals meet in a police lineup and join forces in a complex heist, with the sole survivor telling a twisting tale to the police.',
    tags: ['crime', 'mystery', 'thriller', 'twist-ending', 'heist', 'unreliable-narrator'],
    weights: [1.0, 0.9, 0.9, 1.0, 0.7, 0.8],
  },
  {
    title: 'Se7en', type: 'movie', year: 1995,
    synopsis: 'Two detectives hunt a serial killer who uses the seven deadly sins as his modus operandi in a grim and rain-soaked city.',
    tags: ['crime', 'thriller', 'mystery', 'psychological', 'bleak', 'serial-killer'],
    weights: [1.0, 1.0, 0.8, 0.9, 1.0, 0.8],
  },
  {
    title: 'The Lion King', type: 'movie', year: 1994,
    synopsis: 'A lion cub prince flees his kingdom after the murder of his father, only to return as an adult to reclaim his throne.',
    tags: ['animation', 'family', 'adventure', 'drama', 'redemption'],
    weights: [1.0, 0.9, 0.8, 0.8, 0.9],
  },
  {
    title: 'Requiem for a Dream', type: 'movie', year: 2000,
    synopsis: 'Four people living in Brooklyn spiral into the nightmare of addiction as their dreams of a better life disintegrate.',
    tags: ['drama', 'psychological', 'disturbing', 'addiction', 'bleak'],
    weights: [1.0, 1.0, 1.0, 0.9, 0.9],
  },
  {
    title: 'Inglourious Basterds', type: 'movie', year: 2009,
    synopsis: 'A group of Jewish-American soldiers scalp Nazis in occupied France while a young cinema owner plots her own revenge against the Third Reich.',
    tags: ['war', 'adventure', 'revenge', 'historical', 'alternate-history'],
    weights: [0.9, 0.7, 0.9, 0.7, 0.8],
  },
  {
    title: 'Memento', type: 'movie', year: 2000,
    synopsis: 'A man with short-term memory loss uses notes and tattoos to hunt for the man he believes killed his wife.',
    tags: ['thriller', 'mystery', 'nonlinear', 'memory', 'revenge'],
    weights: [0.9, 0.9, 1.0, 1.0, 0.8],
  },
  {
    title: 'Django Unchained', type: 'movie', year: 2012,
    synopsis: 'With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.',
    tags: ['western', 'drama', 'slavery', 'revenge', 'historical'],
    weights: [0.9, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Green Mile', type: 'movie', year: 1999,
    synopsis: 'A death row corrections officer discovers that one of his inmates possesses a miraculous gift of healing.',
    tags: ['drama', 'fantasy', 'prison', 'supernatural', 'sacrifice'],
    weights: [1.0, 0.6, 0.7, 0.7, 0.8],
  },
  {
    title: 'La La Land', type: 'movie', year: 2016,
    synopsis: 'A jazz pianist and an aspiring actress fall in love while chasing their dreams in modern Los Angeles.',
    tags: ['romance', 'drama', 'musical', 'hollywood', 'bittersweet'],
    weights: [0.9, 0.8, 0.9, 0.7, 0.9],
  },
  {
    title: 'The Intouchables', type: 'movie', year: 2011,
    synopsis: 'A wealthy quadriplegic hires an unlikely caretaker from the projects, and the two form an enduring and transformative friendship.',
    tags: ['comedy', 'drama', 'friendship', 'feel-good', 'uplifting'],
    weights: [0.7, 0.9, 0.9, 0.9, 0.9],
  },
  {
    title: 'WALL-E', type: 'movie', year: 2008,
    synopsis: 'A lonely trash-compacting robot left on a deserted Earth discovers love and follows a sleek probe robot across the galaxy.',
    tags: ['animation', 'sci-fi', 'romance', 'robots', 'environmental'],
    weights: [1.0, 0.9, 0.7, 0.9, 0.7],
  },
  {
    title: 'The Lives of Others', type: 'movie', year: 2006,
    synopsis: 'An East German Stasi agent surveilling a playwright and his lover becomes increasingly absorbed by their lives.',
    tags: ['drama', 'thriller', 'espionage', 'surveillance', 'redemption'],
    weights: [1.0, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'Grave of the Fireflies', type: 'anime', year: 1988,
    synopsis: 'Two siblings struggle to survive on their own in Japan during the final months of World War II after being orphaned by American firebombing.',
    tags: ['animation', 'drama', 'war', 'survival', 'tragedy', 'bittersweet'],
    weights: [1.0, 1.0, 1.0, 0.8, 0.9, 0.8],
  },
  {
    title: 'Aliens', type: 'movie', year: 1986,
    synopsis: 'Ellen Ripley returns to the planet where her crew first encountered the alien, this time with a squad of colonial marines.',
    tags: ['sci-fi', 'action', 'horror', 'aliens', 'survival', 'sequel'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.8, 0.8],
  },
  {
    title: 'Heat', type: 'movie', year: 1995,
    synopsis: 'A master thief and an obsessive LAPD detective engage in a high-stakes game of cat and mouse across Los Angeles.',
    tags: ['crime', 'action', 'drama', 'heist', 'cat-and-mouse'],
    weights: [1.0, 0.8, 0.8, 0.8, 0.8],
  },
  {
    title: 'Reservoir Dogs', type: 'movie', year: 1992,
    synopsis: 'After a simple diamond heist goes wrong, the surviving criminals suspect that one of them is an undercover police officer.',
    tags: ['crime', 'thriller', 'heist', 'betrayal', 'nonlinear'],
    weights: [1.0, 0.9, 0.8, 0.8, 0.7],
  },
  {
    title: 'Monty Python and the Holy Grail', type: 'movie', year: 1975,
    synopsis: 'King Arthur and his knights embark on a low-budget quest for the Holy Grail, encountering many absurd obstacles along the way.',
    tags: ['comedy', 'adventure', 'satire', 'medieval', 'slapstick', 'absurd'],
    weights: [1.0, 0.6, 1.0, 0.8, 0.9, 0.8],
  },
  {
    title: 'The Thing', type: 'movie', year: 1982,
    synopsis: 'A research team in Antarctica is hunted by a shape-shifting alien that can perfectly imitate its victims.',
    tags: ['sci-fi', 'horror', 'aliens', 'paranoia', 'survival', 'practical-effects'],
    weights: [1.0, 1.0, 0.9, 0.9, 0.7, 0.8],
  },
  {
    title: 'Braveheart', type: 'movie', year: 1995,
    synopsis: 'Scottish warrior William Wallace leads his countrymen in a rebellion against the oppressive English rule during the 13th century.',
    tags: ['historical', 'action', 'drama', 'war', 'revolution', 'medieval'],
    weights: [0.9, 0.8, 0.8, 0.8, 0.9, 0.8],
  },
  {
    title: 'Casino Royale', type: 'movie', year: 2006,
    synopsis: 'James Bond earns his 00 status on his first mission, facing a terrorist financier in a high-stakes poker game in Montenegro.',
    tags: ['action', 'spy', 'thriller', 'espionage'],
    weights: [0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Up', type: 'movie', year: 2009,
    synopsis: 'A 78-year-old widower ties thousands of balloons to his house and flies to South America, accidentally taking a young stowaway along.',
    tags: ['animation', 'adventure', 'family', 'feel-good', 'bittersweet'],
    weights: [1.0, 0.9, 0.8, 0.8, 0.9],
  },
  {
    title: 'The Wolf of Wall Street', type: 'movie', year: 2013,
    synopsis: 'The true story of stockbroker Jordan Belfort, who built a fortune through fraud and corruption before his empire came crashing down.',
    tags: ['comedy', 'crime', 'business', 'corruption', 'chaotic', 'voiceover'],
    weights: [0.8, 0.9, 0.9, 0.9, 0.8, 0.7],
  },
  {
    title: 'Princess Mononoke', type: 'anime', year: 1997,
    synopsis: 'A young warrior embroiled in a conflict between forest gods and a mining colony seeks a cure for a deadly curse he has received.',
    tags: ['animation', 'fantasy', 'adventure', 'nature', 'epic'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.9],
  },

  // ---------- TV SHOWS - US (50) ----------
  {
    title: 'Breaking Bad', type: 'tv', year: 2008,
    synopsis: 'A high school chemistry teacher diagnosed with terminal cancer turns to manufacturing and selling methamphetamine to secure his family\'s future.',
    tags: ['drama', 'crime', 'thriller', 'serialized', 'dark', 'anti-hero'],
    weights: [1.0, 0.9, 0.8, 1.0, 0.9, 0.9],
  },
  {
    title: 'The Wire', type: 'tv', year: 2002,
    synopsis: 'A panoramic view of Baltimore\'s drug trade is examined through the eyes of law enforcement, drug dealers, politicians, and citizens.',
    tags: ['crime', 'drama', 'gritty', 'ensemble-cast', 'social-commentary', 'realistic'],
    weights: [1.0, 1.0, 1.0, 1.0, 0.9, 0.9],
  },
  {
    title: 'The Sopranos', type: 'tv', year: 1999,
    synopsis: 'New Jersey mob boss Tony Soprano struggles to balance his crime family with his actual family while seeking therapy for panic attacks.',
    tags: ['crime', 'drama', 'mafia', 'psychological', 'family-dynamics'],
    weights: [1.0, 1.0, 1.0, 0.9, 0.8],
  },
  {
    title: 'Game of Thrones', type: 'tv', year: 2011,
    synopsis: 'Nine noble families fight for control of the mythical land of Westeros while an ancient enemy returns after millennia.',
    tags: ['fantasy', 'drama', 'medieval', 'power-struggle', 'dragons', 'epic'],
    weights: [1.0, 1.0, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Mad Men', type: 'tv', year: 2007,
    synopsis: 'A 1960s Madison Avenue advertising agency\'s creative director Don Draper navigates the changing social mores and his own troubled identity.',
    tags: ['drama', 'historical', 'business', 'identity', 'period-piece'],
    weights: [1.0, 0.9, 0.7, 0.9, 0.9],
  },
  {
    title: 'The Simpsons', type: 'tv', year: 1989,
    synopsis: 'The satirical adventures of a working-class family in the dysfunctional town of Springfield.',
    tags: ['animation', 'comedy', 'satire', 'family', 'episodic', 'sitcom'],
    weights: [1.0, 0.9, 0.9, 0.8, 0.9, 0.9],
  },
  {
    title: 'Friends', type: 'tv', year: 1994,
    synopsis: 'Six young friends living in Manhattan navigate careers, relationships, and the hilarity of everyday life in the 1990s.',
    tags: ['comedy', 'romance', 'friendship', 'sitcom', 'ensemble-cast'],
    weights: [0.9, 0.7, 0.9, 1.0, 0.9],
  },
  {
    title: 'Seinfeld', type: 'tv', year: 1989,
    synopsis: 'A stand-up comedian and his three neurotic friends navigate the absurdities of daily life in New York City.',
    tags: ['comedy', 'sitcom', 'big-city', 'episodic', 'observational'],
    weights: [1.0, 1.0, 0.7, 0.9, 0.9],
  },
  {
    title: 'The Twilight Zone', type: 'tv', year: 1959,
    synopsis: 'Ordinary people find themselves in extraordinarily astounding situations, each with a moral or twist ending, in this classic anthology.',
    tags: ['sci-fi', 'fantasy', 'horror', 'anthology', 'twist-ending', 'mystery'],
    weights: [0.8, 0.8, 0.7, 1.0, 1.0, 0.8],
  },
  {
    title: 'The X-Files', type: 'tv', year: 1993,
    synopsis: 'Two FBI agents investigate unsolved cases involving paranormal phenomena and government conspiracies.',
    tags: ['sci-fi', 'mystery', 'supernatural', 'conspiracy', 'aliens'],
    weights: [1.0, 0.9, 0.9, 0.9, 0.8],
  },
  {
    title: 'Twin Peaks', type: 'tv', year: 1990,
    synopsis: 'An FBI agent investigates the murder of a homecoming queen in a small Pacific Northwest town full of secrets and supernatural forces.',
    tags: ['mystery', 'drama', 'surreal', 'small-town', 'supernatural', 'quirky'],
    weights: [1.0, 0.9, 0.9, 0.9, 0.8, 0.8],
  },
  {
    title: 'The Office (US)', type: 'tv', year: 2005,
    synopsis: 'A mockumentary following the daily lives of office employees at the Scranton branch of the Dunder Mifflin Paper Company.',
    tags: ['comedy', 'mockumentary', 'workplace', 'sitcom', 'ensemble-cast'],
    weights: [1.0, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'Lost', type: 'tv', year: 2004,
    synopsis: 'Survivors of a plane crash on a mysterious tropical island must work together to stay alive while uncovering the island\'s supernatural secrets.',
    tags: ['drama', 'mystery', 'sci-fi', 'survival', 'flashbacks', 'island'],
    weights: [0.9, 1.0, 0.7, 0.9, 0.9, 0.7],
  },
  {
    title: 'Fargo', type: 'tv', year: 2014,
    synopsis: 'An anthology series of quirky crime stories set in the upper Midwest, each season featuring new characters and shocking criminal schemes.',
    tags: ['crime', 'drama', 'dark-comedy', 'anthology', 'small-town'],
    weights: [0.9, 0.9, 0.8, 0.9, 0.8],
  },
  {
    title: 'True Detective', type: 'tv', year: 2014,
    synopsis: 'An anthology series where each season follows different detectives investigating brutal crimes while grappling with personal demons.',
    tags: ['crime', 'mystery', 'drama', 'anthology', 'philosophical', 'gritty'],
    weights: [1.0, 0.9, 0.9, 0.8, 0.8, 0.9],
  },
  {
    title: 'Stranger Things', type: 'tv', year: 2016,
    synopsis: 'Kids in a small Indiana town uncover a secret government lab, a parallel dimension, and a telekinetic girl in this 1980s-set adventure.',
    tags: ['sci-fi', 'horror', 'drama', '1980s', 'nostalgic', 'coming-of-age'],
    weights: [0.9, 0.7, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'Band of Brothers', type: 'miniseries', year: 2001,
    synopsis: 'The true story of Easy Company, 506th Regiment of the 101st Airborne Division, from their training through the end of World War II.',
    tags: ['war', 'drama', 'historical', 'miniseries', 'ensemble-cast', 'sacrifice'],
    weights: [1.0, 0.9, 0.9, 1.0, 0.8, 0.8],
  },
  {
    title: 'Chernobyl', type: 'miniseries', year: 2019,
    synopsis: 'A dramatization of the 1986 nuclear disaster at the Chernobyl power plant and the extraordinary efforts to contain the catastrophe.',
    tags: ['drama', 'historical', 'miniseries', 'disaster', 'cover-up', 'gritty'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8, 0.8],
  },
  {
    title: 'House of Cards', type: 'tv', year: 2013,
    synopsis: 'A ruthless politician and his wife stop at nothing to conquer the White House, manipulating allies and enemies along the way.',
    tags: ['drama', 'political', 'thriller', 'power-struggle', 'corruption'],
    weights: [1.0, 1.0, 0.8, 1.0, 0.9],
  },
  {
    title: 'The Crown', type: 'tv', year: 2016,
    synopsis: 'A biographical drama following the reign of Queen Elizabeth II, exploring the political and personal events that shaped the second half of the 20th century.',
    tags: ['drama', 'historical', 'royalty', 'biographical', 'period-piece'],
    weights: [0.9, 0.9, 0.9, 0.8, 0.9],
  },
  {
    title: 'The West Wing', type: 'tv', year: 1999,
    synopsis: 'Inside the lives of staffers in the West Wing of the White House as they navigate political crises and personal challenges.',
    tags: ['drama', 'political', 'workplace', 'idealistic', 'dialogue-driven'],
    weights: [1.0, 1.0, 0.7, 0.8, 0.8],
  },
  {
    title: 'Better Call Saul', type: 'tv', year: 2015,
    synopsis: 'The transformation of small-time lawyer Jimmy McGill into the morally flexible criminal lawyer Saul Goodman, years before meeting Walter White.',
    tags: ['crime', 'drama', 'legal', 'character-study', 'prequel'],
    weights: [0.9, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Leftovers', type: 'tv', year: 2014,
    synopsis: 'Three years after 2% of the world\'s population inexplicably vanishes, the residents of a small town struggle to find meaning and move on.',
    tags: ['drama', 'mystery', 'supernatural', 'grief', 'existential'],
    weights: [1.0, 0.8, 0.6, 0.9, 0.9],
  },
  {
    title: 'Six Feet Under', type: 'tv', year: 2001,
    synopsis: 'A dysfunctional family runs a funeral home, grappling with death, relationships, and their own personal demons daily.',
    tags: ['drama', 'family-dynamics', 'dark-comedy', 'death', 'existential'],
    weights: [1.0, 0.9, 0.7, 0.9, 0.8],
  },
  {
    title: 'The Americans', type: 'tv', year: 2013,
    synopsis: 'Two Soviet intelligence agents pose as a married American couple in Washington D.C. during the Reagan administration.',
    tags: ['drama', 'spy', 'thriller', 'espionage', 'cold-war', 'secret-identity'],
    weights: [1.0, 0.9, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Arrested Development', type: 'tv', year: 2003,
    synopsis: 'The wildly eccentric Bluth family loses its fortune, and the responsible son must manage the chaotic aftermath.',
    tags: ['comedy', 'sitcom', 'quirky', 'family-dynamics', 'running-gags'],
    weights: [1.0, 0.8, 0.9, 0.8, 0.8],
  },
  {
    title: 'Succession', type: 'tv', year: 2018,
    synopsis: 'The Roy family fights for control of a global media conglomerate as the patriarch\'s health declines.',
    tags: ['drama', 'dark-comedy', 'business', 'family-dynamics', 'power-struggle'],
    weights: [1.0, 0.8, 0.9, 0.9, 1.0],
  },
  {
    title: 'The Bear', type: 'tv', year: 2022,
    synopsis: 'A fine-dining chef returns to Chicago to run his late brother\'s chaotic sandwich shop and transform it into something great.',
    tags: ['drama', 'comedy', 'food', 'workplace', 'grief', 'stressful'],
    weights: [0.9, 0.7, 0.9, 0.8, 0.8, 0.9],
  },
  {
    title: 'South Park', type: 'tv', year: 1997,
    synopsis: 'Four foul-mouthed fourth-graders in a small Colorado town navigate a world of absurd adults and topical social satire.',
    tags: ['animation', 'comedy', 'satire', 'political', 'irreverent'],
    weights: [1.0, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Freaks and Geeks', type: 'tv', year: 1999,
    synopsis: 'A group of misfit high school students navigate the social landscape of suburban Detroit in the early 1980s.',
    tags: ['comedy', 'drama', 'coming-of-age', 'teen', '1980s', 'school'],
    weights: [0.7, 0.9, 0.9, 0.9, 0.7, 0.9],
  },
  {
    title: 'Hannibal', type: 'tv', year: 2013,
    synopsis: 'FBI profiler Will Graham forms a dark and twisted relationship with psychiatrist Dr. Hannibal Lecter while hunting serial killers.',
    tags: ['thriller', 'horror', 'crime', 'psychological', 'serial-killer', 'disturbing'],
    weights: [1.0, 0.9, 0.8, 1.0, 0.9, 0.9],
  },
  {
    title: 'Firefly', type: 'tv', year: 2002,
    synopsis: 'The renegade crew of a small spaceship takes on any job that pays, staying one step ahead of the totalitarian Alliance in a future frontier solar system.',
    tags: ['sci-fi', 'western', 'adventure', 'space-exploration', 'found-family'],
    weights: [0.9, 0.8, 0.8, 0.9, 0.9],
  },
  {
    title: 'The Handmaid\'s Tale', type: 'tv', year: 2017,
    synopsis: 'In a dystopian theocracy where fertile women are forced into sexual servitude, one woman fights to survive and find her daughter.',
    tags: ['drama', 'sci-fi', 'dystopian', 'oppression', 'rebellion'],
    weights: [1.0, 0.8, 1.0, 1.0, 0.9],
  },
  {
    title: 'Westworld', type: 'tv', year: 2016,
    synopsis: 'A futuristic theme park populated by android hosts allows guests to live out their fantasies without consequence, until the hosts begin to awaken.',
    tags: ['sci-fi', 'western', 'artificial-intelligence', 'robots', 'consciousness'],
    weights: [1.0, 0.7, 1.0, 0.9, 0.9],
  },
  {
    title: 'Fleabag', type: 'tv', year: 2016,
    synopsis: 'A dry-witted woman navigates love and life in London while trying to cope with a recent tragedy and running her failing café.',
    tags: ['comedy', 'drama', 'breaking-fourth-wall', 'grief', 'relationships'],
    weights: [0.8, 0.9, 0.9, 0.7, 0.8],
  },
  {
    title: 'Dexter', type: 'tv', year: 2006,
    synopsis: 'A Miami forensics expert moonlights as a serial killer of criminals who have escaped justice, while maintaining a facade of normal life.',
    tags: ['crime', 'drama', 'thriller', 'vigilante', 'serial-killer', 'secret-identity'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.8, 0.8],
  },
  {
    title: 'Russian Doll', type: 'tv', year: 2019,
    synopsis: 'A cynical New Yorker gets caught in a time loop on the night of her 36th birthday party, dying repeatedly and restarting each time.',
    tags: ['comedy', 'drama', 'mystery', 'time-loop', 'existential', 'quirky'],
    weights: [0.7, 0.8, 0.8, 0.9, 0.8, 0.8],
  },
  {
    title: 'Veep', type: 'tv', year: 2012,
    synopsis: 'The day-to-day absurdities of a fictional U.S. Vice President and her bumbling staff as they navigate the Washington political circus.',
    tags: ['comedy', 'political', 'satire', 'workplace', 'foul-mouthed'],
    weights: [1.0, 1.0, 0.9, 0.7, 0.7],
  },
  {
    title: 'The Good Place', type: 'tv', year: 2016,
    synopsis: 'A self-absorbed woman is mistakenly sent to a cheerful afterlife and must hide her moral imperfections while learning what it truly means to be good.',
    tags: ['comedy', 'fantasy', 'philosophical', 'ethical', 'quirky', 'afterlife'],
    weights: [0.8, 0.7, 0.9, 0.9, 0.8, 0.8],
  },
  {
    title: 'Barry', type: 'tv', year: 2018,
    synopsis: 'A depressed hitman from the Midwest travels to Los Angeles for a job and discovers a passion for acting in a local theater class.',
    tags: ['comedy', 'crime', 'drama', 'dark-comedy', 'hollywood'],
    weights: [0.7, 0.8, 0.8, 0.9, 0.7],
  },
  {
    title: 'Ted Lasso', type: 'tv', year: 2020,
    synopsis: 'An American college football coach is hired to manage an English Premier League soccer team despite having no experience with the sport.',
    tags: ['comedy', 'sports', 'feel-good', 'uplifting', 'fish-out-of-water'],
    weights: [0.9, 0.8, 1.0, 0.9, 0.8],
  },
  {
    title: 'Severance', type: 'tv', year: 2022,
    synopsis: 'Employees of a mysterious corporation undergo a procedure that surgically separates their work and personal memories.',
    tags: ['sci-fi', 'drama', 'thriller', 'mystery', 'identity', 'workplace'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'Ozark', type: 'tv', year: 2017,
    synopsis: 'A financial advisor drags his family from Chicago to the Missouri Ozarks to launder money for a Mexican drug cartel.',
    tags: ['crime', 'drama', 'thriller', 'money-laundering', 'survival'],
    weights: [1.0, 0.9, 0.9, 0.8, 0.8],
  },
  {
    title: 'Peaky Blinders', type: 'tv', year: 2013,
    synopsis: 'The Shelby crime family rises to power in post-WWI Birmingham, England, led by ambitious and cunning gangster Tommy Shelby.',
    tags: ['crime', 'drama', 'historical', 'mafia', 'period-piece'],
    weights: [1.0, 0.9, 0.8, 0.8, 0.8],
  },
  {
    title: 'Battlestar Galactica', type: 'tv', year: 2004,
    synopsis: 'After the destruction of human civilization by sentient robots, the survivors aboard a ragtag fleet search for a mythical new homeworld.',
    tags: ['sci-fi', 'drama', 'robots', 'survival', 'space-exploration', 'political'],
    weights: [1.0, 0.9, 0.9, 0.8, 0.9, 0.7],
  },
  {
    title: 'Dark', type: 'tv', year: 2017,
    synopsis: 'The disappearance of two children in a small German town exposes the fractured relationships and dark secrets connecting four families across multiple generations.',
    tags: ['sci-fi', 'thriller', 'mystery', 'time-travel', 'family-dynamics', 'nonlinear'],
    weights: [1.0, 0.8, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Mr. Robot', type: 'tv', year: 2015,
    synopsis: 'A cybersecurity engineer and vigilante hacker with social anxiety disorder is recruited by an underground group to take down corporate America.',
    tags: ['drama', 'thriller', 'hacking', 'psychological', 'rebellion'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8],
  },

  // ---------- TV SHOWS - UK / International (30) ----------
  {
    title: 'Sherlock', type: 'tv', year: 2010,
    synopsis: 'A modern-day update of Arthur Conan Doyle\'s detective stories starring Benedict Cumberbatch as a brilliant but sociopathic consulting detective.',
    tags: ['mystery', 'crime', 'drama', 'detective', 'modern-adaptation'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.8],
  },
  {
    title: 'Doctor Who', type: 'tv', year: 2005,
    synopsis: 'The adventures of the Doctor, a time-traveling alien from the planet Gallifrey who explores the universe in a blue police box.',
    tags: ['sci-fi', 'adventure', 'time-travel', 'aliens', 'long-running'],
    weights: [1.0, 0.9, 0.9, 0.8, 0.8],
  },
  {
    title: 'Downton Abbey', type: 'tv', year: 2010,
    synopsis: 'The lives of the aristocratic Crawley family and their servants in a grand English country house through the early 20th century.',
    tags: ['drama', 'historical', 'period-piece', 'royalty', 'class-struggle'],
    weights: [0.9, 0.9, 0.9, 0.7, 0.8],
  },
  {
    title: 'Black Mirror', type: 'tv', year: 2011,
    synopsis: 'An anthology series exploring the dark and often dystopian side of technology and its impact on modern society.',
    tags: ['sci-fi', 'drama', 'anthology', 'dystopian', 'technology', 'disturbing'],
    weights: [1.0, 0.8, 0.9, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Office (UK)', type: 'tv', year: 2001,
    synopsis: 'A mockumentary following the daily lives of office employees at the Slough branch of the Wernham Hogg paper company, lead by the clueless David Brent.',
    tags: ['comedy', 'mockumentary', 'workplace', 'cringe-humor', 'sitcom'],
    weights: [1.0, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'Derry Girls', type: 'tv', year: 2018,
    synopsis: 'A group of teenage friends navigate the absurdities of adolescence while living in Northern Ireland during the final years of the Troubles.',
    tags: ['comedy', 'coming-of-age', 'historical', 'teen', 'school'],
    weights: [0.9, 0.8, 0.7, 0.9, 0.8],
  },
  {
    title: 'Luther', type: 'tv', year: 2010,
    synopsis: 'A brilliant but obsessive London detective faces the darkest criminals while struggling with his own personal demons.',
    tags: ['crime', 'drama', 'thriller', 'detective', 'gritty'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.8],
  },
  {
    title: 'Planet Earth', type: 'documentary', year: 2006,
    synopsis: 'An awe-inspiring nature documentary series showcasing the beauty and diversity of habitats and wildlife across the entire planet.',
    tags: ['documentary', 'nature', 'educational', 'cinematography', 'epic'],
    weights: [1.0, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Great British Bake Off', type: 'tv', year: 2010,
    synopsis: 'Amateur bakers compete in weekly challenges to impress judges with their baking skills in this wholesome competition series.',
    tags: ['reality', 'cooking', 'competition', 'cozy', 'feel-good'],
    weights: [0.9, 1.0, 0.8, 1.0, 0.9],
  },
  {
    title: 'Broadchurch', type: 'tv', year: 2013,
    synopsis: 'The murder of a young boy in a small coastal town triggers a media frenzy and exposes deep secrets within the close-knit community.',
    tags: ['crime', 'drama', 'mystery', 'small-town', 'grief'],
    weights: [1.0, 0.9, 0.9, 0.9, 0.8],
  },
  {
    title: 'Fawlty Towers', type: 'tv', year: 1975,
    synopsis: 'The misadventures of a rude and short-tempered hotel owner, his wife, and their eccentric staff in a seaside English hotel.',
    tags: ['comedy', 'sitcom', 'slapstick', 'classic', 'farce'],
    weights: [1.0, 0.9, 0.8, 0.8, 0.9],
  },
  {
    title: 'Bodyguard', type: 'tv', year: 2018,
    synopsis: 'A war veteran turned police protection officer is assigned to protect a controversial Home Secretary whose politics he despises.',
    tags: ['thriller', 'drama', 'political', 'espionage', 'action'],
    weights: [0.9, 0.9, 0.8, 0.7, 0.7],
  },
  {
    title: 'Squid Game', type: 'tv', year: 2021,
    synopsis: 'Hundreds of cash-strapped players accept a strange invitation to compete in deadly children\'s games for a life-changing prize.',
    tags: ['drama', 'thriller', 'survival', 'dystopian', 'social-commentary', 'death-game'],
    weights: [1.0, 0.9, 0.9, 0.9, 0.8, 1.0],
  },
  {
    title: 'Money Heist (La Casa de Papel)', type: 'tv', year: 2017,
    synopsis: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police from outside.',
    tags: ['crime', 'thriller', 'heist', 'action', 'resistance'],
    weights: [1.0, 0.9, 1.0, 0.8, 0.7],
  },
  {
    title: 'Dark (Germany)', type: 'tv', year: 2017,
    synopsis: 'The disappearance of children in a German town connects four estranged families across time, revealing a supernatural knot spanning three generations.',
    tags: ['sci-fi', 'mystery', 'time-travel', 'family-dynamics', 'nonlinear', 'eerie'],
    weights: [1.0, 0.9, 1.0, 0.8, 0.9, 0.8],
  },
  {
    title: 'Narcos', type: 'tv', year: 2015,
    synopsis: 'The rise of Colombian drug lord Pablo Escobar and the DEA agents who hunted him in a brutal war on drugs throughout the 1980s and 1990s.',
    tags: ['crime', 'drama', 'drugs', 'mafia', 'historical', 'gritty'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8, 0.9],
  },
  {
    title: 'Mindhunter', type: 'tv', year: 2017,
    synopsis: 'Two FBI agents pioneer the development of criminal profiling and psychology by interviewing imprisoned serial killers in the late 1970s.',
    tags: ['crime', 'drama', 'thriller', 'psychological', 'serial-killer', '1970s'],
    weights: [1.0, 0.9, 0.8, 0.9, 0.9, 0.7],
  },
  {
    title: 'It\'s Always Sunny in Philadelphia', type: 'tv', year: 2005,
    synopsis: 'Five narcissistic, self-centered friends run a struggling Irish bar in Philadelphia while constantly hatching selfish schemes.',
    tags: ['comedy', 'sitcom', 'dark-comedy', 'irreverent', 'long-running'],
    weights: [1.0, 0.8, 0.9, 0.9, 0.7],
  },
  {
    title: 'Silicon Valley', type: 'tv', year: 2014,
    synopsis: 'A group of introverted programmers live in a tech incubator and try to launch their compression algorithm startup amid cutthroat competition.',
    tags: ['comedy', 'technology', 'business', 'workplace', 'satire'],
    weights: [0.9, 0.9, 0.8, 0.7, 0.8],
  },
  {
    title: 'Top Gear', type: 'tv', year: 2002,
    synopsis: 'Three car enthusiasts travel the world, review supercars, and undertake absurd automotive challenges and epic road trips.',
    tags: ['reality', 'automotive', 'comedy', 'adventure', 'traveling'],
    weights: [0.8, 0.9, 0.7, 0.8, 0.8],
  },
  {
    title: 'Cosmos: A Spacetime Odyssey', type: 'documentary', year: 2014,
    synopsis: 'An exploration of the universe\'s laws through the cosmic calendar, from the Big Bang to the evolution of human consciousness.',
    tags: ['documentary', 'educational', 'sci-fi', 'space-exploration', 'inspirational'],
    weights: [1.0, 0.9, 0.7, 0.9, 0.8],
  },
  {
    title: 'Chef\'s Table', type: 'documentary', year: 2015,
    synopsis: 'Each episode profiles a single world-renowned chef, exploring their creative philosophies, culinary innovations, and personal backstories.',
    tags: ['documentary', 'food', 'cooking', 'biographical', 'cinematography'],
    weights: [1.0, 1.0, 0.9, 0.7, 0.8],
  },
  {
    title: 'Making a Murderer', type: 'documentary', year: 2015,
    synopsis: 'A 10-year documentary following the case of Steven Avery, a man exonerated by DNA after 18 years in prison only to be charged with a new crime.',
    tags: ['documentary', 'crime', 'true-crime', 'justice', 'corruption'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8],
  },
  {
    title: 'The Jinx', type: 'documentary', year: 2015,
    synopsis: 'A documentary miniseries examining the life of millionaire Robert Durst, suspected of three murders over three decades.',
    tags: ['documentary', 'crime', 'true-crime', 'mystery', 'suspenseful'],
    weights: [1.0, 0.9, 1.0, 0.8, 0.9],
  },
  {
    title: 'Wild Wild Country', type: 'documentary', year: 2018,
    synopsis: 'The controversial Indian guru Bhagwan Shree Rajneesh and his followers build a utopian city in rural Oregon, leading to conflict with locals.',
    tags: ['documentary', 'cult', 'historical', 'power-struggle', 'true-crime'],
    weights: [1.0, 1.0, 0.8, 0.8, 0.7],
  },
  {
    title: 'Tiger King', type: 'documentary', year: 2020,
    synopsis: 'A wild true story of rivalry among big cat conservationists and collectors in America, centering on the eccentric Joe Exotic.',
    tags: ['documentary', 'crime', 'true-crime', 'chaotic', 'cult-personality'],
    weights: [1.0, 0.7, 0.9, 0.9, 0.8],
  },
  {
    title: 'The Last Dance', type: 'documentary', year: 2020,
    synopsis: 'The definitive story of Michael Jordan and the 1990s Chicago Bulls dynasty, featuring never-before-seen footage from their final championship season.',
    tags: ['documentary', 'sports', 'biographical', '1990s', 'championship'],
    weights: [1.0, 1.0, 0.8, 0.8, 0.7],
  },
  {
    title: 'The Civil War', type: 'documentary', year: 1990,
    synopsis: 'Ken Burns\' epic documentary bringing the American Civil War to life through photographs, diaries, and letters of ordinary people.',
    tags: ['documentary', 'war', 'historical', 'educational', 'epic'],
    weights: [1.0, 0.9, 0.9, 0.9, 0.8],
  },
  {
    title: 'Cosmos: A Personal Voyage', type: 'documentary', year: 1980,
    synopsis: 'Carl Sagan takes viewers on a journey through the cosmos, exploring scientific discoveries and the human place in the universe.',
    tags: ['documentary', 'educational', 'sci-fi', 'space-exploration', '1980s'],
    weights: [1.0, 0.9, 0.7, 0.9, 0.7],
  },
  {
    title: 'Free Solo', type: 'documentary', year: 2018,
    synopsis: 'Professional rock climber Alex Honnold attempts to conquer the 3,000-foot El Capitan wall in Yosemite without any ropes or safety gear.',
    tags: ['documentary', 'sports', 'nature', 'thrilling', 'achievement'],
    weights: [1.0, 0.8, 0.7, 0.9, 0.8],
  },
  {
    title: 'The Vietnam War', type: 'documentary', year: 2017,
    synopsis: 'Ken Burns and Lynn Novick\'s 10-part documentary exploring the Vietnam War from all sides through testimony from nearly 80 witnesses.',
    tags: ['documentary', 'war', 'historical', 'educational', 'gritty'],
    weights: [1.0, 0.9, 0.9, 0.9, 0.8],
  },
  {
    title: 'Apollo 11', type: 'documentary', year: 2019,
    synopsis: 'A look at the Apollo 11 mission using newly discovered archival footage, documenting humanity\'s first moon landing.',
    tags: ['documentary', 'historical', 'space-exploration', 'archival-footage', 'achievement'],
    weights: [1.0, 0.8, 1.0, 0.8, 0.8],
  },
  {
    title: 'March of the Penguins', type: 'documentary', year: 2005,
    synopsis: 'A portrayal of the yearly journey of emperor penguins across the Antarctic as they march to their breeding grounds under extreme conditions.',
    tags: ['documentary', 'nature', 'survival', 'educational'],
    weights: [1.0, 1.0, 0.7, 0.8],
  },
  {
    title: 'Won\'t You Be My Neighbor?', type: 'documentary', year: 2018,
    synopsis: 'An intimate portrait of children\'s television host Fred Rogers and his radical kindness philosophy that shaped generations.',
    tags: ['documentary', 'biographical', 'feel-good', 'inspirational', 'uplifting'],
    weights: [1.0, 0.8, 0.9, 0.9, 0.9],
  },
  {
    title: 'American Factory', type: 'documentary', year: 2019,
    synopsis: 'A Chinese billionaire opens a factory in an abandoned GM plant in Ohio, leading to culture clashes between Chinese management and American workers.',
    tags: ['documentary', 'workplace', 'business', 'globalization', 'culture-clash'],
    weights: [1.0, 0.8, 0.8, 0.8, 0.8],
  },
  {
    title: 'Icarus', type: 'documentary', year: 2017,
    synopsis: 'A filmmaker investigates doping in cycling, only to uncover a massive Russian state-sponsored Olympic doping scandal.',
    tags: ['documentary', 'sports', 'scandal', 'espionage', 'thriller'],
    weights: [1.0, 0.8, 0.9, 0.7, 0.8],
  },

  // ---------- MINISERIES (15) ----------
  {
    title: 'Roots', type: 'miniseries', year: 1977,
    synopsis: 'The saga of an African man captured as a slave and his descendants through generations of American history.',
    tags: ['drama', 'historical', 'miniseries', 'slavery', 'family-dynamics', 'survival'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8, 0.8],
  },
  {
    title: 'Angels in America', type: 'miniseries', year: 2003,
    synopsis: 'A sprawling exploration of the AIDS crisis in 1980s America told through intersecting stories of love, loss, and divine intervention.',
    tags: ['drama', 'miniseries', 'fantasy', 'religion', 'LGBTQ+'],
    weights: [0.9, 1.0, 0.7, 0.8, 0.8],
  },
  {
    title: 'Pride and Prejudice', type: 'miniseries', year: 1995,
    synopsis: 'Jane Austen\'s classic tale of the spirited Elizabeth Bennet and the proud Mr. Darcy in early 19th-century England.',
    tags: ['drama', 'romance', 'historical', 'miniseries', 'period-piece', 'literary-adaptation'],
    weights: [0.8, 0.9, 0.8, 1.0, 0.9, 0.8],
  },
  {
    title: 'The Queen\'s Gambit', type: 'miniseries', year: 2020,
    synopsis: 'An orphaned chess prodigy in the 1950s and 1960s dominates the male-dominated world of competitive chess while battling addiction.',
    tags: ['drama', 'miniseries', 'coming-of-age', 'addiction', 'period-piece'],
    weights: [1.0, 1.0, 0.8, 0.8, 0.7],
  },
  {
    title: 'Mare of Easttown', type: 'miniseries', year: 2021,
    synopsis: 'A small-town Pennsylvania detective investigates a murder while her own personal life crumbles around her.',
    tags: ['crime', 'drama', 'miniseries', 'mystery', 'small-town', 'grief'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8, 0.8],
  },
  {
    title: 'Sharp Objects', type: 'miniseries', year: 2018,
    synopsis: 'A troubled reporter returns to her hometown to cover the murders of two young girls, confronting her own demons and family secrets.',
    tags: ['drama', 'thriller', 'miniseries', 'mystery', 'psychological', 'small-town'],
    weights: [0.9, 0.9, 1.0, 0.8, 0.9, 0.8],
  },
  {
    title: 'Watchmen', type: 'miniseries', year: 2019,
    synopsis: 'Set decades after the events of the graphic novel, masked vigilantes are treated as outlaws amid racial tensions in Tulsa, Oklahoma.',
    tags: ['drama', 'superhero', 'miniseries', 'alternate-history', 'racial', 'mystery'],
    weights: [0.9, 0.8, 1.0, 0.8, 0.9, 0.7],
  },
  {
    title: 'Olive Kitteridge', type: 'miniseries', year: 2014,
    synopsis: 'A misanthropic but deeply human retired schoolteacher in small-town Maine navigates the quiet tragedies and joys of everyday life.',
    tags: ['drama', 'miniseries', 'character-study', 'small-town', 'family-dynamics'],
    weights: [1.0, 1.0, 0.9, 0.8, 0.8],
  },
  {
    title: 'When They See Us', type: 'miniseries', year: 2019,
    synopsis: 'The true story of the Central Park Five — five teenagers wrongly convicted of a brutal assault in 1989 New York.',
    tags: ['drama', 'miniseries', 'true-crime', 'justice', 'racial'],
    weights: [1.0, 1.0, 0.9, 1.0, 0.8],
  },
  {
    title: 'The Pacific', type: 'miniseries', year: 2010,
    synopsis: 'The intertwined stories of three U.S. Marines during the Pacific theater of World War II.',
    tags: ['war', 'drama', 'miniseries', 'historical', 'survival'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8],
  },
  {
    title: 'John Adams', type: 'miniseries', year: 2008,
    synopsis: 'The life and legacy of one of America\'s founding fathers, from the Boston Massacre through his presidency and twilight years.',
    tags: ['drama', 'historical', 'miniseries', 'political', 'biographical', 'period-piece'],
    weights: [0.9, 0.9, 1.0, 0.8, 0.8, 0.8],
  },
  {
    title: 'Lonesome Dove', type: 'miniseries', year: 1989,
    synopsis: 'Two retired Texas Rangers embark on a perilous cattle drive from Texas to Montana, facing outlaws, nature, and the end of the Old West.',
    tags: ['western', 'adventure', 'miniseries', 'friendship', 'epic'],
    weights: [1.0, 0.8, 1.0, 0.8, 0.9],
  },
  {
    title: 'Tokyo Vice', type: 'tv', year: 2022,
    synopsis: 'An American journalist working for a Tokyo newspaper penetrates the dangerous world of the Yakuza in 1990s Japan.',
    tags: ['crime', 'drama', 'thriller', 'japan', 'journalism', 'mafia'],
    weights: [1.0, 0.9, 0.8, 0.8, 0.8, 0.7],
  },
  {
    title: 'Station Eleven', type: 'miniseries', year: 2021,
    synopsis: 'Survivors of a devastating flu pandemic attempt to rebuild and reimagine the world through art and human connection.',
    tags: ['drama', 'sci-fi', 'miniseries', 'post-apocalyptic', 'survival'],
    weights: [0.9, 0.7, 1.0, 1.0, 0.8],
  },
  {
    title: 'The Underground Railroad', type: 'miniseries', year: 2021,
    synopsis: 'A young woman\'s escape from a Georgia plantation is reimagined as a literal railroad network with engineers and conductors.',
    tags: ['drama', 'historical', 'miniseries', 'slavery', 'survival', 'magical-realism'],
    weights: [1.0, 0.9, 1.0, 0.9, 0.8, 0.8],
  },
  {
    title: 'Dopesick', type: 'miniseries', year: 2021,
    synopsis: 'The origins of the opioid crisis in America, from the boardrooms of Purdue Pharma to the DEA and devastated small-town communities.',
    tags: ['drama', 'miniseries', 'addiction', 'medicine', 'corruption', 'true-crime'],
    weights: [1.0, 1.0, 0.9, 0.8, 0.8, 0.8],
  },

  // ---------- ANIME (20) ----------
  {
    title: 'Death Note', type: 'anime', year: 2006,
    synopsis: 'A brilliant high school student discovers a supernatural notebook that kills anyone whose name is written in it, leading him into a cat-and-mouse game with a genius detective.',
    tags: ['anime', 'thriller', 'supernatural', 'psychological', 'cat-and-mouse', 'morality'],
    weights: [0.9, 0.9, 0.8, 1.0, 0.9, 0.9],
  },
  {
    title: 'Attack on Titan', type: 'anime', year: 2013,
    synopsis: 'Humanity lives in cities surrounded by enormous walls to protect them from gigantic humanoid creatures called Titans that devour humans.',
    tags: ['anime', 'action', 'fantasy', 'post-apocalyptic', 'survival', 'dark'],
    weights: [0.9, 0.9, 0.8, 0.8, 0.8, 0.9],
  },
  {
    title: 'Fullmetal Alchemist: Brotherhood', type: 'anime', year: 2009,
    synopsis: 'Two brothers use alchemy to search for the Philosopher\'s Stone after a failed attempt to revive their dead mother costs them their bodies.',
    tags: ['anime', 'fantasy', 'adventure', 'action', 'magic', 'sacrifice'],
    weights: [0.9, 0.9, 0.8, 0.8, 0.8, 0.8],
  },
  {
    title: 'Cowboy Bebop', type: 'anime', year: 1998,
    synopsis: 'A ragtag crew of bounty hunters travels across the solar system aboard their spaceship, the Bebop, chasing criminals and escaping their own pasts.',
    tags: ['anime', 'sci-fi', 'action', 'noir', 'space-exploration', 'found-family'],
    weights: [0.9, 0.9, 0.7, 0.8, 0.8, 0.8],
  },
  {
    title: 'Neon Genesis Evangelion', type: 'anime', year: 1995,
    synopsis: 'Teenagers pilot giant mechs to defend Earth from mysterious beings called Angels, while grappling with psychological trauma and existential dread.',
    tags: ['anime', 'sci-fi', 'action', 'psychological', 'mecha', 'existential', 'experimental'],
    weights: [0.9, 0.8, 0.7, 1.0, 0.9, 0.9, 0.8],
  },
  {
    title: 'One Piece', type: 'anime', year: 1999,
    synopsis: 'Monkey D. Luffy and his pirate crew search for the ultimate treasure known as One Piece to become the Pirate King.',
    tags: ['anime', 'adventure', 'fantasy', 'pirates', 'long-running', 'friendship'],
    weights: [0.9, 1.0, 0.8, 0.9, 0.9, 0.8],
  },
  {
    title: 'Hunter x Hunter', type: 'anime', year: 2011,
    synopsis: 'A young boy sets out to become a Hunter and find his long-lost father in a world filled with dangerous creatures and powerful adversaries.',
    tags: ['anime', 'adventure', 'fantasy', 'action', 'coming-of-age', 'friendship'],
    weights: [0.9, 0.9, 0.8, 0.8, 0.7, 0.7],
  },
  {
    title: 'Steins;Gate', type: 'anime', year: 2011,
    synopsis: 'A self-proclaimed mad scientist accidentally discovers a method of time travel through text messages, leading to devastating consequences.',
    tags: ['anime', 'sci-fi', 'thriller', 'time-travel', 'psychological', 'mind-bending'],
    weights: [0.9, 0.9, 0.8, 1.0, 0.8, 0.8],
  },
  {
    title: 'Demon Slayer', type: 'anime', year: 2019,
    synopsis: 'A kind-hearted boy becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.',
    tags: ['anime', 'action', 'fantasy', 'supernatural', 'demons', 'historical'],
    weights: [0.9, 0.9, 0.8, 0.9, 0.9, 0.7],
  },
  {
    title: 'Jujutsu Kaisen', type: 'anime', year: 2020,
    synopsis: 'A high school student swallows a cursed finger and becomes a host to an ancient evil, joining a secret organization of sorcerers to collect the remaining fingers.',
    tags: ['anime', 'action', 'supernatural', 'demons', 'school'],
    weights: [0.9, 0.9, 0.9, 0.8, 0.7],
  },
  {
    title: 'Your Lie in April', type: 'anime', year: 2014,
    synopsis: 'A piano prodigy who lost the ability to hear his own playing meets a free-spirited violinist who changes his outlook on music and life.',
    tags: ['anime', 'drama', 'romance', 'music-industry', 'bittersweet', 'tragedy'],
    weights: [0.9, 0.9, 0.8, 0.9, 0.9, 0.7],
  },
  {
    title: 'Vinland Saga', type: 'anime', year: 2019,
    synopsis: 'A young Icelandic boy witnesses his father\'s murder and dedicates his life to revenge in the brutal world of Viking-era England.',
    tags: ['anime', 'action', 'historical', 'vikings', 'revenge', 'war'],
    weights: [0.9, 0.8, 0.9, 0.9, 0.9, 0.8],
  },
  {
    title: 'Monster', type: 'anime', year: 2004,
    synopsis: 'A brilliant Japanese neurosurgeon in Germany is framed for murders committed by a former patient — a charismatic serial killer he once saved.',
    tags: ['anime', 'thriller', 'mystery', 'psychological', 'crime', 'serial-killer'],
    weights: [0.9, 1.0, 0.9, 1.0, 0.8, 0.8],
  },
  {
    title: 'Akira', type: 'anime', year: 1988,
    synopsis: 'A secret military project endangers Neo-Tokyo when a biker gang member develops destructive psychokinetic powers after a government experiment.',
    tags: ['anime', 'sci-fi', 'action', 'cyberpunk', 'dystopian', 'experimental'],
    weights: [0.9, 0.9, 0.8, 1.0, 0.9, 0.9],
  },
  {
    title: 'My Neighbor Totoro', type: 'anime', year: 1988,
    synopsis: 'Two young sisters move to the countryside to be near their hospitalized mother and discover friendly forest spirits living nearby.',
    tags: ['anime', 'family', 'fantasy', 'whimsical', 'feel-good', 'nature'],
    weights: [0.9, 0.9, 0.7, 0.9, 0.9, 0.8],
  },
  {
    title: 'Your Name', type: 'anime', year: 2016,
    synopsis: 'Two teenagers discover they are intermittently swapping bodies and must navigate each other\'s lives while a cosmic event looms.',
    tags: ['anime', 'romance', 'fantasy', 'supernatural', 'bittersweet', 'body-swap'],
    weights: [0.9, 0.9, 0.7, 0.7, 0.8, 0.9],
  },
  {
    title: 'Chainsaw Man', type: 'anime', year: 2022,
    synopsis: 'A debt-ridden young man merges with his pet devil-dog to become a chainsaw-wielding devil hunter for a mysterious government agency.',
    tags: ['anime', 'action', 'horror', 'supernatural', 'demons', 'dark-comedy'],
    weights: [0.9, 0.9, 0.8, 0.9, 0.8, 0.7],
  },
  {
    title: 'Ghost in the Shell', type: 'anime', year: 1995,
    synopsis: 'A cyborg policewoman and her partner hunt a mysterious mastermind known as the Puppet Master in a futuristic cyberpunk Japan.',
    tags: ['anime', 'sci-fi', 'action', 'cyberpunk', 'artificial-intelligence', 'philosophical'],
    weights: [0.9, 0.9, 0.7, 1.0, 0.9, 0.8],
  },
  {
    title: 'Mob Psycho 100', type: 'anime', year: 2016,
    synopsis: 'A powerful but emotionally repressed psychic middle schooler learns to express himself under the guidance of his con-man mentor.',
    tags: ['anime', 'comedy', 'action', 'supernatural', 'supernatural-powers', 'coming-of-age'],
    weights: [0.9, 0.8, 0.8, 0.9, 0.8, 0.7],
  },
  {
    title: 'Cyberpunk: Edgerunners', type: 'anime', year: 2022,
    synopsis: 'A street kid in a dystopian future city becomes an edgerunner — a mercenary outlaw for hire — after receiving an experimental spinal implant.',
    tags: ['anime', 'sci-fi', 'action', 'cyberpunk', 'dystopian', 'tragedy'],
    weights: [0.9, 0.9, 0.8, 1.0, 0.9, 0.7],
  },
];

// Helper: ensure uniqueness by removing duplicate shows with same title+year
const uniqueShows = new Map();
for (const s of shows) {
  const key = `${s.title}|${s.year}`;
  if (!uniqueShows.has(key)) {
    uniqueShows.set(key, s);
  }
}
const dedupedShows = [...uniqueShows.values()];

// =============================================================================
// SEED FUNCTION
// =============================================================================

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ------ Insert tags ------
    console.log(`Inserting ${tags.length} tags...`);
    const insertedTagIds = {};
    for (const tag of tags) {
      const res = await client.query(
        `INSERT INTO tags (name, category) VALUES ($1, $2)
         ON CONFLICT (name) DO UPDATE SET category = EXCLUDED.category
         RETURNING id`,
        [tag.name, tag.category]
      );
      insertedTagIds[tag.name] = res.rows[0].id;
    }
    console.log('Tags inserted.');

    // ------ Insert shows ------
    console.log(`Inserting ${dedupedShows.length} shows...`);
    const showIds = {};
    for (let i = 0; i < dedupedShows.length; i++) {
      const show = dedupedShows[i];
      const res = await client.query(
        `INSERT INTO shows (title, type, year, synopsis)
         SELECT $1, $2, $3, $4
         WHERE NOT EXISTS (SELECT 1 FROM shows WHERE title = $1 AND year = $3 AND type = $2)
         RETURNING id`,
        [show.title, show.type, show.year, show.synopsis]
      );
      if (res.rows.length > 0) {
        showIds[show.title] = res.rows[0].id;
      } else {
        const existing = await client.query(
          `SELECT id FROM shows WHERE title = $1 AND year = $2 AND type = $3 LIMIT 1`,
          [show.title, show.year, show.type]
        );
        showIds[show.title] = existing.rows[0].id;
      }
      if ((i + 1) % 20 === 0) {
        console.log(`  Inserted/verified ${i + 1}/${dedupedShows.length} shows...`);
      }
    }
    console.log('Shows inserted.');

    // ------ Insert show_tags ------
    console.log('Inserting show_tags...');
    let tagCount = 0;
    for (const show of dedupedShows) {
      const showId = showIds[show.title];
      if (!showId) continue;
      for (let j = 0; j < show.tags.length; j++) {
        const tagName = show.tags[j];
        const tagId = insertedTagIds[tagName];
        if (!tagId) continue;
        const weight = show.weights[j] || 0.7;
        await client.query(
          `INSERT INTO show_tags (show_id, tag_id, weight) VALUES ($1, $2, $3)
           ON CONFLICT (show_id, tag_id) DO NOTHING`,
          [showId, tagId, weight]
        );
        tagCount++;
      }
    }
    console.log(`${tagCount} show_tags inserted.`);

    await client.query('COMMIT');
    console.log('\nSeed completed successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();

