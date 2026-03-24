import { Link } from 'react-router-dom'

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

function MovieCard({ movie }) {
  const ratingClass = ratingStyles[movie.experienceRating] || "from-gray-500 to-gray-700"
  const ratingEmoji = ratingEmojis[movie.experienceRating] || "⭐"

  const fallbackPoster = `https://placehold.co/300x450/1a1a2e/e50914?text=${encodeURIComponent(movie.title)}`

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card block group">
      <div className="relative bg-critiq-card rounded-xl overflow-hidden shadow-lg">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster || fallbackPoster}
            alt={movie.title}
            className="movie-poster w-full h-full object-cover transition-transform duration-300"
            onError={(e) => {
              if (e.target.src !== fallbackPoster) {
                e.target.src = fallbackPoster
              }
            }}
          />
          
          {/* Rating Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${ratingClass} text-white text-xs font-bold flex items-center gap-1 rating-badge`}>
            <span>{ratingEmoji}</span>
            <span>{movie.experienceRating}</span>
          </div>

          {/* Quality Badge */}
          {movie.streaming && movie.streaming[0] && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 rounded text-xs font-semibold text-white">
              {movie.streaming[0].quality}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-gray-300 text-sm line-clamp-2">{movie.synopsis}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {movie.genres.slice(0, 3).map((genre, idx) => (
                  <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate group-hover:text-red-500 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-400 text-sm">{movie.year}</span>
            <div className="flex items-center gap-1">
              {movie.streaming && movie.streaming.slice(0, 2).map((stream, idx) => (
                <span key={idx} className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded">
                  {stream.platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
