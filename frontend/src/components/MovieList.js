import { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "./MovieCard"

function MovieList({ searchQuery }) {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const apiKey = process.env.REACT_APP_TMDB_API_KEY

  useEffect(() => {
    setLoading(true)

    let url
    if (searchQuery && searchQuery.trim() !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    }

    axios.get(url)
      .then((response) => {
        setMovies(response.data.results)
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error)
        setLoading(false)
      })

  }, [searchQuery])

  if (loading) {
    return (
      <p className="text-white text-center text-lg md:text-xl mt-10">
        Loading movies... ⏳
      </p>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-3 md:px-4">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-3 md:mb-4">
        {searchQuery ? `🔍 Results for "${searchQuery}"` : "🎬 Popular Movies"}
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-center text-lg md:text-xl mt-10">
          Koi movie nahi mili 😢
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieList