import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../service/api'

interface singInProps {
  email: string
  password: string
}

interface AuthState {
  token: string
  user: object
}

interface AuthProps {
  user: object
  singIn(credentials: singInProps): Promise<void>
  singOut(): void
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token')
    const user = localStorage.getItem('@Gobarber:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const singIn = useCallback(async ({ email, password }: singInProps) => {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { token, user } = response.data

    localStorage.setItem('@Gobarber:token', token)
    localStorage.setItem('@Gobarber:user', JSON.stringify(user))

    setData({
      token,
      user
    })
  }, [])

  const singOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token')
    localStorage.removeItem('@Gobarber:user')
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, singIn, singOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthProps {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('We need one context')
  }

  return context
}

export { AuthProvider, useAuth }
