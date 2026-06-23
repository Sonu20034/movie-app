import { Link } from "react-router-dom"
import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"

function MovieCard({ movie }) {

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const favorite = isFavorite(movie.id)

  function handleHeartClick(e) {
    e.preventDefault()
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-gray-800 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer relative">
        
        {/* Heart Button */}
        <button 
          onClick={handleHeartClick}
          className="absolute top-2 md:top-3 right-2 md:right-3 bg-black bg-opacity-60 hover:bg-opacity-80 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg md:text-2xl transition z-10"
        >
          {favorite ? "❤️" : "🤍"}
        </button>

        {/* Movie Poster */}
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
        />

        {/* Movie Info */}
        <div className="p-3 md:p-4">
          <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 truncate">
            {movie.title}
          </h3>

          <div className="flex justify-between items-center">
            <span className="text-yellow-400 font-semibold text-xs md:text-base">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400 text-xs md:text-sm">
              {movie.release_date}
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default MovieCard