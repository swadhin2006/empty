// Vercel Serverless Function — wraps the entire Express app
const express = require('express');
const cors = require('cors');
const { movies, experienceRatings, streamingPlatforms, genres, languages } = require('../critiq-backend/data/movies');
const tmdbService = require('../critiq-backend/services/tmdb');
const translatorService = require('../critiq-backend/services/translator');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Get all movies
app.get('/api/movies', (req, res) => {
  res.json({ success: true, count: movies.length, data: movies });
});

// 2. Get movie by ID
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
  res.json({ success: true, data: movie });
});

// 3. Search movies
app.get('/api/search', async (req, res) => {
  const { q, genre, rating, year, category } = req.query;
  let results = [...movies];

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(movie =>
      movie.title.toLowerCase().includes(query) ||
      movie.actors.some(a => a.toLowerCase().includes(query)) ||
      movie.director.toLowerCase().includes(query) ||
      movie.genres.some(g => g.toLowerCase().includes(query)) ||
      movie.themes.some(t => t.toLowerCase().includes(query))
    );
  }
  if (genre) results = results.filter(m => m.genres.some(g => g.toLowerCase() === genre.toLowerCase()));
  if (rating) results = results.filter(m => m.experienceRating.toLowerCase() === rating.toLowerCase());
  if (year) results = results.filter(m => m.year === parseInt(year));
  if (category) results = results.filter(m => m.category.toLowerCase() === category.toLowerCase());

  if (q && results.length === 0) {
    try {
      const tmdbResults = await tmdbService.searchMovies(q);
      const mapped = tmdbResults.map(m => ({
        id: `tmdb-${m.id}`, title: m.title, year: m.year, director: 'N/A',
        actors: [], genres: [], themes: [], synopsis: m.synopsis, poster: m.poster,
        experienceRating: 'Go For It', streaming: [], category: 'just-for-fun', source: 'tmdb'
      }));
      return res.json({ success: true, count: mapped.length, data: mapped, source: 'tmdb' });
    } catch (err) { console.error('TMDB fallback failed:', err.message); }
  }

  res.json({ success: true, count: results.length, data: results, source: 'local' });
});

// 4. Ratings
app.get('/api/ratings', (req, res) => res.json({ success: true, data: experienceRatings }));
app.get('/api/ratings/:rating', (req, res) => {
  const filtered = movies.filter(m => m.experienceRating.toLowerCase() === req.params.rating.toLowerCase());
  res.json({ success: true, count: filtered.length, data: filtered });
});

// 5. Discover
app.get('/api/discover', (req, res) => {
  res.json({ success: true, data: {
    'underrated': movies.filter(m => m.category === 'underrated'),
    'overrated': movies.filter(m => m.category === 'overrated'),
    'just-for-fun': movies.filter(m => m.category === 'just-for-fun'),
    'must-watch': movies.filter(m => m.category === 'must-watch')
  }});
});
app.get('/api/discover/:section', (req, res) => {
  const section = req.params.section.toLowerCase();
  const valid = ['underrated','overrated','just-for-fun','must-watch'];
  if (!valid.includes(section)) return res.status(404).json({ success: false, message: 'Section not found' });
  const filtered = movies.filter(m => m.category === section);
  res.json({ success: true, section, count: filtered.length, data: filtered });
});

// 6. Streaming
app.get('/api/movies/:id/streaming', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
  res.json({ success: true, movie: movie.title, data: movie.streaming });
});
app.get('/api/streaming/:platform', (req, res) => {
  const platform = req.params.platform.toLowerCase();
  const filtered = movies.filter(m => m.streaming.some(s => s.platform.toLowerCase().includes(platform)));
  res.json({ success: true, platform, count: filtered.length, data: filtered });
});

// 7. Meta
app.get('/api/platforms', (req, res) => res.json({ success: true, data: streamingPlatforms }));
app.get('/api/genres', (req, res) => res.json({ success: true, data: genres }));
app.get('/api/languages', (req, res) => res.json({ success: true, data: languages }));
app.get('/api/featured', (req, res) => {
  const featured = movies.filter(m => m.experienceRating === 'Masterpiece' || m.experienceRating === 'Absolute Cinema').slice(0, 10);
  res.json({ success: true, data: featured });
});

// 8. AI Language
app.get('/api/movies/:id/ai-language', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
  const aiFeatures = movie.streaming.map(stream => ({
    platform: stream.platform, quality: stream.quality, audioLanguages: stream.audioLanguages,
    aiSubtitles: { available: stream.aiSubtitles?.length > 0, languages: stream.aiSubtitles || [] },
    aiDubbing: { available: stream.aiDubbing?.length > 0, languages: stream.aiDubbing || [] }
  }));
  res.json({ success: true, movie: movie.title, data: aiFeatures });
});

// 9. AI Dubbing
app.post('/api/movies/:id/dub', async (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
  const { language } = req.body;
  if (!language) return res.status(400).json({ success: false, message: 'Language is required' });
  const result = await translatorService.generateAIDubbing(movie.title, movie.synopsis, language);
  res.json({ success: result.success, movie: movie.title, language, ...result });
});

// 10. TMDB
app.get('/api/tmdb/popular', async (req, res) => {
  const data = await tmdbService.getPopularMovies(req.query.page || 1);
  res.json({ success: true, count: data.length, data });
});
app.get('/api/tmdb/search', async (req, res) => {
  if (!req.query.q) return res.status(400).json({ success: false, message: 'Query required' });
  const data = await tmdbService.searchMovies(req.query.q);
  res.json({ success: true, count: data.length, data });
});
app.get('/api/tmdb/movie/:id', async (req, res) => {
  const data = await tmdbService.getMovieById(req.params.id);
  if (!data) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data });
});

// 11. Translation
app.post('/api/translate', async (req, res) => {
  const { text, targetLanguage, sourceLanguage } = req.body;
  if (!text || !targetLanguage) return res.status(400).json({ success: false, message: 'text and targetLanguage required' });
  const result = await translatorService.translateText(text, targetLanguage, sourceLanguage);
  res.json(result);
});
app.get('/api/translate/languages', (req, res) => {
  res.json({ success: true, data: translatorService.getSupportedLanguages() });
});
app.post('/api/translate/dialogue', async (req, res) => {
  const { dialogue, targetLanguage, context } = req.body;
  if (!dialogue || !targetLanguage) return res.status(400).json({ success: false, message: 'dialogue and targetLanguage required' });
  const result = await translatorService.translateDialogue(dialogue, targetLanguage, context);
  res.json(result);
});
app.post('/api/translate/trailer', async (req, res) => {
  const { scenes, targetLanguage, sourceLanguage } = req.body;
  if (!scenes || !Array.isArray(scenes) || !targetLanguage) return res.status(400).json({ success: false, message: 'scenes array and targetLanguage required' });
  const results = [];
  for (const scene of scenes) {
    const r = await translatorService.translateText(scene.text, targetLanguage, sourceLanguage || 'English');
    results.push({ id: scene.id, timestamp: scene.timestamp, speaker: scene.speaker, originalText: scene.text, translatedText: r.translatedText || scene.text });
  }
  res.json({ success: true, targetLanguage, totalScenes: results.length, data: results });
});

// 12. Health
app.get('/api/health', (req, res) => res.json({ success: true, message: 'CRITIQ API running on Vercel' }));

module.exports = app;
