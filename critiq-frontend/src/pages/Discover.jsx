import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

function Discover() {
  const { section } = useParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const sectionInfo = {
    'must-watch': {
      title: 'Must Watch',
      description: 'Masterpiece & Absolute Cinema movies you must see at least once',
      emoji: '⭐',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-900/20 to-orange-900/20'
    },
    'underrated': {
      title: 'Underrated Gems',
      description: 'Hidden masterpieces that deserve more recognition',
      emoji: '💎',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-900/20 to-pink-900/20'
    },
    'overrated': {
      title: 'Overrated',
      description: 'Movies that didn\'t live up to the hype',
      emoji: '🤔',
      gradient: 'from-gray-500 to-slate-600',
      bgGradient: 'from-gray-900/20 to-slate-900/20'
    },
    'just-for-fun': {
      title: 'Just for Fun',
      description: 'Perfect movies for a casual movie night',
      emoji: '🎉',
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-900/20 to-teal-900/20'
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/discover/${section}`)
        const data = await res.json()
        
        if (data.success) {
          setMovies(data.data)
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (section) {
      fetchMovies()
    }
  }, [section])

  const info = sectionInfo[section] || {
    title: 'Discover',
    description: 'Explore movies',
    emoji: '🎬',
    gradient: 'from-red-500 to-pink-500',
    bgGradient: 'from-red-900/20 to-pink-900/20'
  }

  return (
    <div className="pt-24 pb-12 min-h-screen">
      {/* Header */}
      <div className={`py-16 px-4 bg-gradient-to-br ${info.bgGradient}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-4">{info.emoji}</div>
          <h1 className="text-5xl font-bold mb-4">{info.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{info.description}</p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto">
            {Object.entries(sectionInfo).map(([key, value]) => (
              <Link
                key={key}
                to={`/discover/${key}`}
                className={`py-4 px-2 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  section === key
                    ? 'text-white border-red-500'
                    : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                {value.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-400">{movies.length} movie{movies.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2">No movies in this category</h3>
            <Link to="/" className="text-red-500 hover:text-red-400">Go back home</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Discover
