import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"
import { AuthContext } from "./AuthContext"


export const FavoritesContext = createContext()



export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])


    const { token, user } = useContext(AuthContext)

    useEffect(() => {
        if (token && user){
        fetchFavorites()
    } else {
        setFavorites([])
    }
}, [token, user])

 async function fetchFavorites() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/favorites`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFavorites(response.data)
        } catch (error) {
            console.log("Error fetching favorites:", error)
        }
    }



  async function addFavorite(movie) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/favorites`,
                {
                    movieId: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setFavorites([...favorites, response.data.favorite])
        } catch (error) {
            console.log("Error adding favorite:", error)
        }
    }

   async function removeFavorite(movieId) {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/favorites/${movieId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setFavorites(favorites.filter((fav) => fav.movieId !== movieId))
        } catch (error) {
            console.log("Error removing favorite:", error)
        }
    }
 function isFavorite(movieId) {
        return favorites.some((fav) => fav.movieId === movieId)
    }

return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
        {children}
    </FavoritesContext.Provider>
)



}