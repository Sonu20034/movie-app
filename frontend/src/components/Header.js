import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Header() {

  const { user, logout } = useContext(AuthContext)

  return (
    <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 shadow-2xl py-4 md:py-6 mb-6 md:mb-8">
      
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
          
          {/* Logo */}
          <Link to="/" className="text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wider md:tracking-widest uppercase">
              🎬 Movie App
            </h1>
          </Link>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3 items-center">
            
            <Link 
              to="/" 
              className="text-white text-sm md:text-base font-semibold hover:text-yellow-300 transition px-2 md:px-3 py-1 md:py-2"
            >
              🏠 Home
            </Link>

            <Link 
              to="/favorites" 
              className="text-white text-sm md:text-base font-semibold hover:text-yellow-300 transition px-2 md:px-3 py-1 md:py-2"
            >
              ❤️ Favorites
            </Link>

            {user ? (
              <>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-md px-3 md:px-4 py-1 md:py-2 rounded-full border border-white border-opacity-30">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-white font-semibold text-sm md:text-base">
                    {user.username}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="bg-white text-pink-600 hover:bg-pink-50 px-3 md:px-5 py-1 md:py-2 rounded-full text-sm md:text-base font-bold transition shadow-lg hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-pink-600 hover:bg-pink-50 px-3 md:px-5 py-1 md:py-2 rounded-full text-sm md:text-base font-bold transition shadow-lg hover:scale-105"
                >
                  🔑 Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-400 text-black hover:bg-yellow-300 px-3 md:px-5 py-1 md:py-2 rounded-full text-sm md:text-base font-bold transition shadow-lg hover:scale-105"
                >
                  📝 Sign Up
                </Link>
              </>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Header