import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

const apiKey = process.env.REACT_APP_TMDB_API_KEY

function MovieDetails() {

  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`

    axios.get(url)
      .then((response) => {
        setMovie(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <p className="text-white text-center text-lg md:text-xl mt-10">
        Loading details... ⏳
      </p>
    )
  }

  if (!movie) {
    return (
      <p className="text-white text-center text-lg md:text-xl mt-10">
        Movie nahi mili 😢
      </p>
    )
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className="max-w-5xl mx-auto px-3 md:px-4">

      {/* Back Button */}
      <Link to="/" className="text-white bg-pink-600 hover:bg-pink-700 px-4 md:px-5 py-2 rounded-full inline-block mb-4 md:mb-6 font-semibold text-sm md:text-base">
        ← Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl">

        {/* Poster */}
        <img 
          src={imageUrl} 
          alt={movie.title} 
          className="w-full md:w-80 rounded-xl md:rounded-2xl shadow-xl"
        />

        {/* Details */}
        <div className="flex-1">

          <h1 className="text-white text-2xl md:text-4xl font-extrabold mb-2">
            {movie.title}
          </h1>

          <p className="text-gray-400 italic mb-3 md:mb-4 text-sm md:text-base">
            {movie.tagline}
          </p>

          <div className="flex gap-2 md:gap-4 mb-3 md:mb-4 flex-wrap">
            <span className="bg-yellow-500 text-black px-2 md:px-3 py-1 rounded-full font-bold text-xs md:text-base">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="bg-gray-700 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-base">
              📅 {movie.release_date}
            </span>
            <span className="bg-gray-700 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-base">
              ⏱️ {movie.runtime} min
            </span>
          </div>

          <div className="flex gap-2 mb-3 md:mb-4 flex-wrap">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="bg-pink-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          <h2 className="text-white text-xl md:text-2xl font-bold mt-4 md:mt-6 mb-2">
            Overview
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {movie.overview}
          </p>

        </div>

      </div>

    </div>
  )
}

export default MovieDetails