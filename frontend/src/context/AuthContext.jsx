import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!storedToken) {
      setLoading(false)
      return
    }
    api
      .get('/auth/profile')
      .then((res) => {
        setUser(res.data)
        setToken(storedToken)
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
      })
      .finally(() => setLoading(false))
  }, [])

  function login(userData, newToken, remember = false) {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('token', newToken)
    storage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setUser(null)
    setToken(null)
    window.location.href = '/login'
  }

  function updateUser(updates) {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
