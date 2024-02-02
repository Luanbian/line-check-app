import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../pages/login/login'

const Stack = createNativeStackNavigator()

export default function Router (): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
