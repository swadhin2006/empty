import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [aiLanguage, setAiLanguage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('streaming')

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      try {
        const [movieRes, aiRes] = await Promise.all([
          fetch(`/api/movies/${id}`),
          fetch(`/api/movies/${id}/ai-language`)
        ])
        
        const movieData = await movieRes.json()
        const aiData = await aiRes.json()
        
        if (movieData.success) {
          setMovie(movieData.data)
        }
        if (aiData.success) {
          setAiLanguage(aiData.data)
        }
      } catch (error) {
        console.error('Error fetching movie:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMovie()
  }, [id])

  const ratingStyles = {
    "Masterpiece": "from-purple-600 to-pink-600",
    "Absolute Cinema": "from-yellow-500 to-orange-500",
    "Go For It": "from-green-500 to-teal-500",
    "Timepass": "from-blue-500 to-cyan-500",
    "Average": "from-gray-500 to-slate-500",
    "Worst": "from-red-600 to-red-800"
  }

  const ratingEmojis = {
    "Masterpiece": "👑",
    "Absolute Cinema": "🍿",
    "Go For It": "✅",
    "Timepass": "🎬",
    "Average": "😐",
    "Worst": "💩"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <Link to="/" className="text-red-500 hover:text-red-400">Go back home</Link>
        </div>
      </div>
    )
  }

  const ratingClass = ratingStyles[movie.experienceRating] || "from-gray-500 to-gray-700"
  const ratingEmoji = ratingEmojis[movie.experienceRating] || "⭐"

  return (
    <div className="pt-20 pb-12 min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Movie Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x600/1a1a2e/e50914?text=${encodeURIComponent(movie.title)}`
                }}
              />
              {/* Rating Badge */}
              <div className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${ratingClass} text-white font-bold flex items-center gap-2`}>
                <span className="text-xl">{ratingEmoji}</span>
                <span>{movie.experienceRating}</span>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {movie.year}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {movie.director}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre, idx) => (
                <span key={idx} className="px-4 py-2 bg-critiq-card rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            {/* Themes */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {movie.themes.map((theme, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Cast */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.actors.map((actor, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-600/20 rounded-full text-sm text-red-400">
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('streaming')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'streaming' 
                  ? 'text-red-500 border-b-2 border-red-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Streaming Availability
            </button>
            <button
              onClick={() => setActiveTab('ai-language')}
              className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'ai-language' 
                  ? 'text-violet-500 border-b-2 border-violet-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🤖</span> AI Language Support
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'streaming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movie.streaming.map((stream, idx) => (
              <div key={idx} className="bg-critiq-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{stream.platform}</h3>
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-semibold">
                    {stream.quality}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Audio Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.audioLanguages.map((lang, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 rounded text-sm">{lang}</span>
                      ))}
                    </div>
                  </div>
                  
                  {stream.aiSubtitles && stream.aiSubtitles.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                        <span>🤖</span> AI Subtitles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stream.aiSubtitles.map((lang, i) => (
                          <span key={i} className="px-2 py-1 bg-violet-600/20 text-violet-400 rounded text-sm">{lang}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {stream.aiDubbing && stream.aiDubbing.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                        <span>🎤</span> AI Dubbing
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stream.aiDubbing.map((lang, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm">{lang}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai-language' && aiLanguage && (
          <div className="space-y-6">
            {aiLanguage.map((item, idx) => (
              <div key={idx} className="bg-critiq-card rounded-xl p-6 border border-violet-600/30 ai-pulse">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{item.platform}</h3>
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-semibold">
                    {item.quality}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Audio Languages */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Original Audio</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.audioLanguages.map((lang, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm">{lang}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* AI Subtitles */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <span className="ai-glow px-2 py-0.5 rounded text-xs">AI</span> Subtitles
                    </h4>
                    {item.aiSubtitles.available ? (
                      <div className="flex flex-wrap gap-2">
                        {item.aiSubtitles.languages.map((lang, i) => (
                          <span key={i} className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">{lang}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">{item.aiSubtitles.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{item.aiSubtitles.description}</p>
                  </div>
                  
                  {/* AI Dubbing */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <span className="ai-glow px-2 py-0.5 rounded text-xs">AI</span> Dubbing
                    </h4>
                    {item.aiDubbing.available ? (
                      <div className="flex flex-wrap gap-2">
                        {item.aiDubbing.languages.map((lang, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">{lang}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">{item.aiDubbing.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{item.aiDubbing.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetail
