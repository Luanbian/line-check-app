import React, { type ReactNode, createContext, useState } from 'react'

interface userData {
  accountId: string
  token: string
}
interface AuthContextType {
  getLoggedUserData: (accountId: string, token: string) => void
  loggedUser?: userData
}
interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
  getLoggedUserData: (accountId: string, token: string) => {}
})

export default function AuthProvider ({ children }: AuthProviderProps): React.JSX.Element {
  const [loggedUser, setLoggedUser] = useState<userData>()

  const getLoggedUserData = (accountId: string, token: string): void => {
    setLoggedUser({ token, accountId })
  }

  return (
    <AuthContext.Provider value={{ getLoggedUserData, loggedUser }}>
      {children}
    </AuthContext.Provider>
  )
}
