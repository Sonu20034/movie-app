import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: email,
        password: password
      })

      login(response.data.token, response.data.user)
      navigate("/")

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center px-3 md:px-4 py-6 md:py-10">
      
      <div className="w-full max-w-md">

        {/* Top Logo */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl md:text-5xl mb-2">🎬</h1>
          <h2 className="text-white text-2xl md:text-3xl font-extrabold">Welcome Back!</h2>
          <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Login karke movies explore karo</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl border border-gray-700">

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-3 md:px-4 py-2 md:py-3 rounded-xl mb-4 md:mb-6 text-center text-xs md:text-sm">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-4 md:mb-5">
              <label className="text-gray-300 text-xs md:text-sm font-semibold mb-1 md:mb-2 block">
                📧 Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-900 text-white text-sm md:text-base rounded-xl px-4 md:px-5 py-3 md:py-4 outline-none focus:ring-2 focus:ring-pink-500 border border-gray-600 focus:border-pink-500 transition placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div className="mb-5 md:mb-6">
              <label className="text-gray-300 text-xs md:text-sm font-semibold mb-1 md:mb-2 block">
                🔒 Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-900 text-white text-sm md:text-base rounded-xl px-4 md:px-5 py-3 md:py-4 outline-none focus:ring-2 focus:ring-pink-500 border border-gray-600 focus:border-pink-500 transition placeholder-gray-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 md:py-4 rounded-xl transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 text-base md:text-lg shadow-lg shadow-pink-500/25"
            >
              {loading ? "⏳ Logging in..." : "🚀 Login"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-4 md:my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-500 px-3 md:px-4 text-xs md:text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Signup Link */}
          <p className="text-gray-400 text-center text-sm md:text-base">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pink-400 hover:text-pink-300 font-bold hover:underline transition">
              Sign Up here →
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login