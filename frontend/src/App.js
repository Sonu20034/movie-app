import { useState } from 'react'
import Header from './components/Header'
import MovieList from './components/MovieList'
import SearchBar from './components/SearchBar'
import MovieDetails from './components/MovieDetails'
import { Routes, Route } from 'react-router-dom'
import Favorites from './components/Favorites'
import Signup from './components/Signup'
import Login from './components/Login'



function App() {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <MovieList searchQuery={searchQuery} />
          </>
          }/>

          <Route path = "/movie/:id" element = {<MovieDetails />}/>
          <Route path = "/favorites" element={<Favorites/>}/>
          <Route path="/signup" element={<Signup />} /> 
           <Route path="/login" element={<Login />} />  
      </Routes>
    </div>
  )
}

export default App