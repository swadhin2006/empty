// TMDB API Service
require('dotenv').config();
const axios = require('axios');

// TMDB API configuration from environment variables
const TMDB_API_KEY = process.env.TMDB_API_KEY || '20189ac7d5a6df9212e7a92f9cecdb24';
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Create axios instance with Bearer token
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: TMDB_ACCESS_TOKEN ? {
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  } : {}
});

// Fetch popular movies
async function getPopularMovies(page = 1) {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
        language: 'en-US'
      }
    });
    return response.data.results.map(movie => formatMovie(movie));
  } catch (error) {
    console.error('Error fetching popular movies:', error.message);
    return [];
  }
}

// Fetch movie by ID
async function getMovieById(id) {
  try {
    const response = await tmdbApi.get(`/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'credits,videos'
      }
    });
    return formatMovieDetails(response.data);
  } catch (error) {
    console.error('Error fetching movie:', error.message);
    return null;
  }
}

// Search movies
async function searchMovies(query) {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        language: 'en-US'
      }
    });
    return response.data.results.map(movie => formatMovie(movie));
  } catch (error) {
    console.error('Error searching movies:', error.message);
    return [];
  }
}

// Get movies by genre
async function getMoviesByGenre(genreId, page = 1) {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        page: page,
        sort_by: 'popularity.desc'
      }
    });
    return response.data.results.map(movie => formatMovie(movie));
  } catch (error) {
    console.error('Error fetching movies by genre:', error.message);
    return [];
  }
}

// Format movie data
function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
    poster: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null,
    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
    synopsis: movie.overview,
    rating: movie.vote_average,
    popularity: movie.popularity
  };
}

// Format detailed movie data
function formatMovieDetails(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
    director: movie.credits?.crew?.find(c => c.job === 'Director')?.name || 'Unknown',
    actors: movie.credits?.cast?.slice(0, 5).map(a => a.name) || [],
    genres: movie.genres?.map(g => g.name) || [],
    synopsis: movie.overview,
    poster: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null,
    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
    rating: movie.vote_average,
    runtime: movie.runtime,
    budget: movie.budget,
    revenue: movie.revenue,
    tagline: movie.tagline
  };
}

module.exports = {
  getPopularMovies,
  getMovieById,
  searchMovies,
  getMoviesByGenre
};
