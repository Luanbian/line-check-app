import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { makeLogin } from '../../../core/factories/pages/login/login.factory'
import { makeHome } from '../../../core/factories/pages/home/home.factory'
import { makeManager } from '../../../core/factories/pages/manager/manager.factory'

const Stack = createNativeStackNavigator()

export default function Router (): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => <>{makeLogin(props)}</>}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => <>{makeHome(props)}</>}
        </Stack.Screen>
        <Stack.Screen name="Manager">
          {(props) => <>{makeManager(props)}</>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};
