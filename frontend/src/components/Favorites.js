import { useContext } from "react"
import { Link } from "react-router-dom"
import { FavoritesContext } from "../context/FavoritesContext"
import MovieCard from "./MovieCard"

function Favorites() {

  const { favorites } = useContext(FavoritesContext)

  return (
    <div className="max-w-6xl mx-auto px-3 md:px-4">

      <Link to="/" className="text-white bg-pink-600 hover:bg-pink-700 px-4 md:px-5 py-2 rounded-full inline-block mb-4 md:mb-6 font-semibold text-sm md:text-base">
        ← Back to Home
      </Link>

      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        ❤️ My Favorites
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center text-lg md:text-xl mt-10">
          Abhi koi favorite nahi hai 😢 <br />
          Movies pe ❤️ click karke add karo!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {favorites.map((fav) => (
            <MovieCard 
              key={fav.movieId} 
              movie={{
                id: fav.movieId,
                title: fav.title,
                poster_path: fav.poster_path,
                vote_average: fav.vote_average,
                release_date: fav.release_date
              }} 
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default Favorites