import React from 'react'
import Router from './src/presentation/components/router/router'
import AuthProvider from './src/presentation/contexts/auth.context'

export default function App (): React.JSX.Element {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )
}
