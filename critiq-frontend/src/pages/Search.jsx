import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [genres, setGenres] = useState([])
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    genre: searchParams.get('genre') || '',
    rating: searchParams.get('rating') || '',
    category: searchParams.get('category') || ''
  })

  const ratings = ['Masterpiece', 'Absolute Cinema', 'Go For It', 'Timepass', 'Average', 'Worst']
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'must-watch', label: 'Must Watch' },
    { value: 'underrated', label: 'Underrated' },
    { value: 'overrated', label: 'Overrated' },
    { value: 'just-for-fun', label: 'Just for Fun' }
  ]

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('/api/genres')
        const data = await res.json()
        if (data.success) {
          setGenres(data.data)
        }
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
    fetchGenres()
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.q) params.append('q', filters.q)
        if (filters.genre) params.append('genre', filters.genre)
        if (filters.rating) params.append('rating', filters.rating)
        if (filters.category) params.append('category', filters.category)

        const res = await fetch(`/api/search?${params.toString()}`)
        const data = await res.json()
        
        if (data.success) {
          setMovies(data.data)
        }
      } catch (error) {
        console.error('Error searching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [filters])

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.append(k, v)
    })
    setSearchParams(params)
  }

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Search Movies</h1>
          <p className="text-gray-400">Find movies by title, actor, director, genre, or theme</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={filters.q}
              onChange={(e) => handleFilterChange('q', e.target.value)}
              placeholder="Search movies, actors (e.g., Shah Rukh Khan), directors, genres..."
              className="w-full bg-critiq-card border border-gray-700 rounded-xl py-4 px-6 pl-14 text-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 search-input"
            />
            <svg
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          {/* Genre Filter */}
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="bg-critiq-card border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

          {/* Rating Filter */}
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="bg-critiq-card border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Ratings</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="bg-critiq-card border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          {/* Clear Filters */}
          {(filters.q || filters.genre || filters.rating || filters.category) && (
            <button
              onClick={() => {
                setFilters({ q: '', genre: '', rating: '', category: '' })
                setSearchParams({})
              }}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {loading ? 'Searching...' : `${movies.length} movie${movies.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2">No movies found</h3>
            <p className="text-gray-400">Try different search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
