// CRITIQ Backend - Express Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { movies, experienceRatings, streamingPlatforms, genres, languages } = require('./data/movies');
const tmdbService = require('./services/tmdb');
const translatorService = require('./services/translator');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    /\.vercel\.app$/,
    /\.onrender\.com$/
  ],
  credentials: true
}));
app.use(express.json());

// ============ API ENDPOINTS ============

// 1. Get all movies
app.get('/api/movies', (req, res) => {
  res.json({
    success: true,
    count: movies.length,
    data: movies
  });
});

// 2. Get movie by ID
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ success: false, message: 'Movie not found' });
  }
  res.json({ success: true, data: movie });
});

// 3. Search movies (by title, actor, director, genre, themes) — local + TMDB fallback
app.get('/api/search', async (req, res) => {
  const { q, genre, rating, year, category } = req.query;
  
  let results = [...movies];
  
  if (q) {
    const query = q.toLowerCase();
    results = results.filter(movie => 
      movie.title.toLowerCase().includes(query) ||
      movie.actors.some(actor => actor.toLowerCase().includes(query)) ||
      movie.director.toLowerCase().includes(query) ||
      movie.genres.some(g => g.toLowerCase().includes(query)) ||
      movie.themes.some(t => t.toLowerCase().includes(query))
    );
  }
  
  if (genre) {
    results = results.filter(movie => 
      movie.genres.some(g => g.toLowerCase() === genre.toLowerCase())
    );
  }
  
  if (rating) {
    results = results.filter(movie => 
      movie.experienceRating.toLowerCase() === rating.toLowerCase()
    );
  }
  
  if (year) {
    results = results.filter(movie => movie.year === parseInt(year));
  }
  
  if (category) {
    results = results.filter(movie => 
      movie.category.toLowerCase() === category.toLowerCase()
    );
  }

  // If text search returns no local results, fall back to TMDB
  if (q && results.length === 0) {
    try {
      const tmdbResults = await tmdbService.searchMovies(q);
      const mapped = tmdbResults.map(m => ({
        id: `tmdb-${m.id}`,
        title: m.title,
        year: m.year,
        director: 'N/A',
        actors: [],
        genres: [],
        themes: [],
        synopsis: m.synopsis,
        poster: m.poster,
        experienceRating: 'Go For It',
        streaming: [],
        category: 'just-for-fun',
        source: 'tmdb'
      }));
      return res.json({ success: true, count: mapped.length, data: mapped, source: 'tmdb' });
    } catch (err) {
      console.error('TMDB search fallback failed:', err.message);
    }
  }
  
  res.json({
    success: true,
    count: results.length,
    data: results,
    source: 'local'
  });
});

// 4. Get movies by experience rating
app.get('/api/ratings/:rating', (req, res) => {
  const rating = req.params.rating;
  const filteredMovies = movies.filter(m => 
    m.experienceRating.toLowerCase() === rating.toLowerCase()
  );
  res.json({
    success: true,
    rating: rating,
    count: filteredMovies.length,
    data: filteredMovies
  });
});

// 5. Get all experience ratings
app.get('/api/ratings', (req, res) => {
  res.json({
    success: true,
    data: experienceRatings
  });
});

// 6. Get discovery sections
app.get('/api/discover/:section', (req, res) => {
  const section = req.params.section.toLowerCase();
  let filteredMovies;
  
  switch(section) {
    case 'underrated':
      filteredMovies = movies.filter(m => m.category === 'underrated');
      break;
    case 'overrated':
      filteredMovies = movies.filter(m => m.category === 'overrated');
      break;
    case 'just-for-fun':
      filteredMovies = movies.filter(m => m.category === 'just-for-fun');
      break;
    case 'must-watch':
      filteredMovies = movies.filter(m => m.category === 'must-watch');
      break;
    default:
      return res.status(404).json({ success: false, message: 'Section not found' });
  }
  
  res.json({
    success: true,
    section: section,
    count: filteredMovies.length,
    data: filteredMovies
  });
});

// 7. Get all discovery sections with movies
app.get('/api/discover', (req, res) => {
  const sections = {
    'underrated': movies.filter(m => m.category === 'underrated'),
    'overrated': movies.filter(m => m.category === 'overrated'),
    'just-for-fun': movies.filter(m => m.category === 'just-for-fun'),
    'must-watch': movies.filter(m => m.category === 'must-watch')
  };
  
  res.json({
    success: true,
    data: sections
  });
});

// 8. Get streaming availability for a movie
app.get('/api/movies/:id/streaming', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ success: false, message: 'Movie not found' });
  }
  res.json({
    success: true,
    movie: movie.title,
    data: movie.streaming
  });
});

// 9. Search movies by streaming platform
app.get('/api/streaming/:platform', (req, res) => {
  const platform = req.params.platform.toLowerCase();
  const filteredMovies = movies.filter(movie => 
    movie.streaming.some(s => s.platform.toLowerCase().includes(platform))
  );
  res.json({
    success: true,
    platform: platform,
    count: filteredMovies.length,
    data: filteredMovies
  });
});

// 10. Get all streaming platforms
app.get('/api/platforms', (req, res) => {
  res.json({
    success: true,
    data: streamingPlatforms
  });
});

// 11. Get all genres
app.get('/api/genres', (req, res) => {
  res.json({
    success: true,
    data: genres
  });
});

// 12. Get all languages
app.get('/api/languages', (req, res) => {
  res.json({
    success: true,
    data: languages
  });
});

// 13. AI Language Support - Get movie with AI features
app.get('/api/movies/:id/ai-language', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ success: false, message: 'Movie not found' });
  }
  
  // Build AI language response
  const aiFeatures = movie.streaming.map(stream => ({
    platform: stream.platform,
    quality: stream.quality,
    audioLanguages: stream.audioLanguages,
    aiSubtitles: {
      available: stream.aiSubtitles && stream.aiSubtitles.length > 0,
      languages: stream.aiSubtitles || [],
      description: stream.aiSubtitles && stream.aiSubtitles.length > 0 
        ? `AI-generated subtitles available in ${stream.aiSubtitles.length} languages`
        : "AI subtitles not available"
    },
    aiDubbing: {
      available: stream.aiDubbing && stream.aiDubbing.length > 0,
      languages: stream.aiDubbing || [],
      description: stream.aiDubbing && stream.aiDubbing.length > 0 
        ? `AI-generated dubbing available in ${stream.aiDubbing.length} languages`
        : "AI dubbing not available"
    }
  }));
  
  res.json({
    success: true,
    movie: movie.title,
    data: aiFeatures
  });
});

// 14. Get movies by actor
app.get('/api/actors/:actor', (req, res) => {
  const actor = req.params.actor.toLowerCase();
  const filteredMovies = movies.filter(movie => 
    movie.actors.some(a => a.toLowerCase().includes(actor))
  );
  res.json({
    success: true,
    actor: req.params.actor,
    count: filteredMovies.length,
    data: filteredMovies
  });
});

// 15. Get movies by director
app.get('/api/directors/:director', (req, res) => {
  const director = req.params.director.toLowerCase();
  const filteredMovies = movies.filter(movie => 
    movie.director.toLowerCase().includes(director)
  );
  res.json({
    success: true,
    director: req.params.director,
    count: filteredMovies.length,
    data: filteredMovies
  });
});

// 16. Get featured/trending movies
app.get('/api/featured', (req, res) => {
  const featured = movies.filter(m => 
    m.experienceRating === 'Masterpiece' || m.experienceRating === 'Absolute Cinema'
  ).slice(0, 10);
  
  res.json({
    success: true,
    data: featured
  });
});

// 17. Get movies by year range
app.get('/api/years/:start/:end', (req, res) => {
  const start = parseInt(req.params.start);
  const end = parseInt(req.params.end);
  const filteredMovies = movies.filter(m => m.year >= start && m.year <= end);
  
  res.json({
    success: true,
    range: `${start}-${end}`,
    count: filteredMovies.length,
    data: filteredMovies
  });
});

// 18. AI Dubbing - Request dubbing for a movie in a specific language
app.post('/api/movies/:id/dub', async (req, res) => {
  const movieId = parseInt(req.params.id);
  const { language, platform } = req.body;
  
  const movie = movies.find(m => m.id === movieId);
  if (!movie) {
    return res.status(404).json({ 
      success: false, 
      message: 'Movie not found' 
    });
  }
  
  if (!language) {
    return res.status(400).json({ 
      success: false, 
      message: 'Language is required' 
    });
  }
  
  // Check if language is supported
  const supportedLanguages = translatorService.getSupportedLanguages();
  if (!supportedLanguages.includes(language) && !languages.includes(language)) {
    return res.status(400).json({ 
      success: false, 
      message: `Language '${language}' is not supported. Available languages: ${supportedLanguages.join(', ')}` 
    });
  }
  
  // Find the streaming platform
  let targetPlatform = movie.streaming[0]; // Default to first platform
  if (platform) {
    const found = movie.streaming.find(s => 
      s.platform.toLowerCase() === platform.toLowerCase()
    );
    if (found) targetPlatform = found;
  }
  
  // Check if dubbing already exists
  const alreadyDubbed = targetPlatform.aiDubbing && 
    targetPlatform.aiDubbing.includes(language);
  
  if (alreadyDubbed) {
    return res.json({
      success: true,
      message: `AI dubbing in ${language} already available`,
      movie: movie.title,
      platform: targetPlatform.platform,
      language: language,
      status: 'available',
      estimatedTime: 0
    });
  }
  
  // Generate AI dubbing using translation service
  const dubbingResult = await translatorService.generateAIDubbing(
    movie.title,
    movie.synopsis,
    language
  );
  
  if (!dubbingResult.success) {
    return res.status(500).json({
      success: false,
      message: 'Failed to generate AI dubbing',
      error: dubbingResult.error
    });
  }
  
  res.json({
    success: true,
    message: `AI dubbing request submitted successfully`,
    movie: movie.title,
    platform: targetPlatform.platform,
    language: language,
    ...dubbingResult
  });
});

// 19. TMDB Integration - Get popular movies from TMDB
app.get('/api/tmdb/popular', async (req, res) => {
  const page = req.query.page || 1;
  const movies = await tmdbService.getPopularMovies(page);
  res.json({
    success: true,
    count: movies.length,
    data: movies
  });
});

// 20. TMDB Integration - Search movies from TMDB
app.get('/api/tmdb/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }
  const movies = await tmdbService.searchMovies(query);
  res.json({
    success: true,
    count: movies.length,
    data: movies
  });
});

// 21. TMDB Integration - Get movie details from TMDB
app.get('/api/tmdb/movie/:id', async (req, res) => {
  const movie = await tmdbService.getMovieById(req.params.id);
  if (!movie) {
    return res.status(404).json({
      success: false,
      message: 'Movie not found'
    });
  }
  res.json({
    success: true,
    data: movie
  });
});

// 22. Translation Service - Translate text
app.post('/api/translate', async (req, res) => {
  const { text, targetLanguage, sourceLanguage } = req.body;
  
  if (!text || !targetLanguage) {
    return res.status(400).json({
      success: false,
      message: 'Text and target language are required'
    });
  }
  
  const result = await translatorService.translateText(text, targetLanguage, sourceLanguage);
  res.json(result);
});

// 23. Get supported languages for translation
app.get('/api/translate/languages', (req, res) => {
  const supportedLanguages = translatorService.getSupportedLanguages();
  res.json({
    success: true,
    data: supportedLanguages
  });
});

// 24. Translate dialogue for dubbing
app.post('/api/translate/dialogue', async (req, res) => {
  const { dialogue, targetLanguage, context } = req.body;
  
  if (!dialogue || !targetLanguage) {
    return res.status(400).json({
      success: false,
      message: 'Dialogue and target language are required'
    });
  }
  
  const result = await translatorService.translateDialogue(dialogue, targetLanguage, context);
  res.json(result);
});

// 25. Translate full trailer script scene by scene
app.post('/api/translate/trailer', async (req, res) => {
  const { scenes, targetLanguage, sourceLanguage } = req.body;

  if (!scenes || !Array.isArray(scenes) || !targetLanguage) {
    return res.status(400).json({
      success: false,
      message: 'scenes array and targetLanguage are required'
    });
  }

  const results = [];
  for (const scene of scenes) {
    const result = await translatorService.translateText(
      scene.text,
      targetLanguage,
      sourceLanguage || 'English'
    );
    results.push({
      id: scene.id,
      timestamp: scene.timestamp,
      speaker: scene.speaker,
      originalText: scene.text,
      translatedText: result.translatedText || scene.text,
      success: result.success,
      model: result.model
    });
  }

  res.json({
    success: true,
    sourceLanguage: sourceLanguage || 'English',
    targetLanguage,
    totalScenes: results.length,
    data: results
  });
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'CRITIQ API is running',
    version: '1.0.0',
    endpoints: {
      movies: '/api/movies',
      search: '/api/search?q=...',
      ratings: '/api/ratings',
      discover: '/api/discover',
      platforms: '/api/platforms',
      genres: '/api/genres',
      languages: '/api/languages'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎬 CRITIQ - AI-Powered Movie Discovery Platform        ║
║                                                           ║
║   Server running on http://localhost:${PORT}               ║
║                                                           ║
║   API Endpoints:                                         ║
║   • GET /api/health           - Health check            ║
║   • GET /api/movies           - All movies              ║
║   • GET /api/movies/:id       - Movie by ID             ║
║   • GET /api/search           - Search movies           ║
║   • GET /api/ratings          - All experience ratings  ║
║   • GET /api/discover         - Discovery sections      ║
║   • GET /api/platforms        - Streaming platforms     ║
║   • GET /api/genres           - All genres              ║
║   • GET /api/languages        - All languages           ║
║   • GET /api/featured         - Featured movies         ║
║   • GET /api/movies/:id/streaming  - Streaming info    ║
║   • GET /api/movies/:id/ai-language - AI language supp  ║
║   • POST /api/movies/:id/dub  - Request AI dubbing     ║
║   • GET /api/tmdb/popular     - TMDB popular movies    ║
║   • GET /api/tmdb/search      - TMDB search movies     ║
║   • POST /api/translate       - Translate text         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
