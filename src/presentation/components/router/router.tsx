import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { makeLogin } from '../../../core/factories/pages/login/login.factory'
import { makeHome } from '../../../core/factories/pages/home/home.factory'
import { makeManager } from '../../../core/factories/pages/manager/manager.factory'
import { makeCreateLineForm } from '../../../core/factories/pages/manager/create.line.form.factory'

const Stack = createNativeStackNavigator()

export default function Router (): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => <>{makeLogin(props)}</>}
        </Stack.Screen>
        <Stack.Screen name="DRIVER">
          {(props) => <>{makeHome(props)}</>}
        </Stack.Screen>
        <Stack.Screen name="MANAGER">
          {(props) => <>{makeManager(props)}</>}
        </Stack.Screen>
        <Stack.Screen name="CREATELINE">
          {(props) => <>{makeCreateLineForm(props)}</>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};
