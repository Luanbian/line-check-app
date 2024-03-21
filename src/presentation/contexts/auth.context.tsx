import React, { type ReactNode, createContext, useState } from 'react'

interface userData {
  accountId: string
  token: string
}
interface AuthContextType {
  getLoggedUserData: (accountId: string, token: string) => void
  loggedUser?: userData
}

export const AuthContext = createContext<AuthContextType>({
  getLoggedUserData: (accountId: string, token: string) => {}
})

export default function AuthProvider (children: ReactNode): React.JSX.Element {
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
