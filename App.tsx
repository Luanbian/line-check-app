import React from 'react'
import Login from './src/presentation/pages/login/login'
import { NavigationContainer } from '@react-navigation/native'

export default function App (): React.JSX.Element {
  return (
    <NavigationContainer>
      <Login/>
    </NavigationContainer>
  )
}
