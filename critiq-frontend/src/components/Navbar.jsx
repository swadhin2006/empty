import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold gradient-text">CRITIQ</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, actors, directors, genres..."
                className="w-full bg-critiq-card border border-gray-700 rounded-full py-2 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 search-input"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/trailer-translation" 
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
            >
              🎬 Trailer AI
            </Link>
            <Link 
              to="/dubbing-demo" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
            >
              🎙️ AI Dubbing
            </Link>
            <Link 
              to="/search" 
              className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Search
            </Link>
            <Link 
              to="/discover/must-watch" 
              className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Must Watch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
