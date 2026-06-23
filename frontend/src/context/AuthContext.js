  import { createContext,useState,useEffect } from "react";



  export const AuthContext = createContext()


  export function AuthProvider({children}){
      const [user , setUser] = useState(null)
      const [token, setToken]= useState(null)
      const [loading, setLoading]= useState(true)

      useEffect(()=>{
          const savedToken = localStorage.getItem("token")
          const savedUser = localStorage.getItem("user")


          if(savedToken && savedUser){
              setToken(savedToken)
              setUser(JSON.parse(savedUser))
          }
        
          setLoading(false)

      },[])

      function login(newToken , newUser){
          setToken(newToken)
          setUser(newUser)

          localStorage.setItem("token",newToken)
          localStorage.setItem("user", JSON.stringify(newUser))
      }

    function logout() {
      setToken(null)
      setUser(null)

      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }

    return (<AuthContext.Provider value={{user,token,loading,login,logout}}>
      { children }
    </AuthContext.Provider>

    )
  }