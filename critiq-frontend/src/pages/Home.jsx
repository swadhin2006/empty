import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [discoverSections, setDiscoverSections] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, discoverRes] = await Promise.all([
          fetch('/api/featured'),
          fetch('/api/discover')
        ])
        
        const featuredData = await featuredRes.json()
        const discoverData = await discoverRes.json()
        
        if (featuredData.success) {
          setFeaturedMovies(featuredData.data)
        }
        if (discoverData.success) {
          setDiscoverSections(discoverData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const discoverySections = [
    { 
      id: 'must-watch', 
      title: 'Must Watch', 
      description: 'Masterpiece & Absolute Cinema movies you must see',
      emoji: '⭐',
      gradient: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 'underrated', 
      title: 'Underrated Gems', 
      description: 'Hidden masterpieces that deserve more recognition',
      emoji: '💎',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'overrated', 
      title: 'Overrated', 
      description: 'Movies that didn\'t live up to the hype',
      emoji: '🤔',
      gradient: 'from-gray-500 to-slate-600'
    },
    { 
      id: 'just-for-fun', 
      title: 'Just for Fun', 
      description: 'Perfect movies for a casual movie night',
      emoji: '🎉',
      gradient: 'from-green-500 to-teal-500'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-critiq-dark to-purple-900/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="gradient-text">CRITIQ</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            AI-Powered Movie Discovery & Streaming Guide
          </p>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Discover movies with our unique experience-based rating system. 
            Find where to stream in HD, 4K with AI-powered subtitles and dubbing.
          </p>
          
          {/* Search CTA */}
          <Link 
            to="/search"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-600/30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Start Discovering Movies
          </Link>

          {/* Experience Ratings Preview */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {['Masterpiece', 'Absolute Cinema', 'Go For It', 'Timepass', 'Average'].map((rating, idx) => (
              <span 
                key={rating}
                className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${
                  ['from-purple-600 to-pink-600', 'from-yellow-500 to-orange-500', 'from-green-500 to-teal-500', 'from-blue-500 to-cyan-500', 'from-gray-500 to-slate-500'][idx]
                } text-white`}
              >
                {rating}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Sections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Explore by Category</h2>
          <p className="text-gray-400 text-center mb-12">Find movies that match your mood</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoverySections.map((section) => (
              <Link 
                key={section.id}
                to={`/discover/${section.id}`}
                className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br hover:scale-105 transition-transform duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{section.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                  <p className="text-gray-300 text-sm">{section.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-16 px-4 bg-critiq-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">Featured Movies</h2>
            <Link to="/search" className="text-red-500 hover:text-red-400 flex items-center gap-2">
              View All <span className="text-xl">→</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredMovies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why CRITIQ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-critiq-card/50">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-3xl">👑</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Experience Ratings</h3>
              <p className="text-gray-400">No more confusing numbers. Understand what to expect with our intuitive rating system.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-critiq-card/50">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎬</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Streaming Info</h3>
              <p className="text-gray-400">Know exactly where to watch and in what quality - HD, Full HD, or 4K.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-critiq-card/50">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Language Support</h3>
              <p className="text-gray-400">AI-generated subtitles and dubbing in multiple languages for better accessibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold gradient-text">CRITIQ</span>
          </div>
          <p className="text-gray-500">AI-Powered Movie Discovery & Streaming Guide</p>
          <p className="text-gray-600 text-sm mt-2">© 2026 CRITIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
