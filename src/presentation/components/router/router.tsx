import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../pages/home/home'
import { makeLogin } from '../../../core/factories/pages/login/login.factory'
import Manager from '../../pages/manager/manager'

const Stack = createNativeStackNavigator()

export default function Router (): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
        {(props) => <>{makeLogin(props)}</>}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Manager"
          component={Manager}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
