import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './screens/Login';
import useAuth from './hooks/useAuth';
import Home from './screens/Home';
import InitialPage from './screens/InitialPage';
import Register from './screens/Register';
import ValidateCode from './screens/ValidateCode';

const Stack = createNativeStackNavigator()

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { validate } = useAuth()

  useEffect(() => {
    validate().then((response: boolean) => {
      setIsAuthenticated(response)
    })
  })

  return (
    <>
      {
        isAuthenticated ? 
        (
          <NavigationContainer>
            <Stack.Navigator initialRouteName='InitialPage'>
              <Stack.Screen options={{headerShown: false}} name='InitialPage' component={InitialPage}/>
              <Stack.Screen options={{headerShown: false}} name='Login' component={Login}/>
              <Stack.Screen options={{headerShown: false}} name='Register' component={Register}/>
              <Stack.Screen options={{headerShown: false}} name='ValidateCode' component={ValidateCode}/>
            </Stack.Navigator>
          </NavigationContainer>
        ): (
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen options={{headerShown: false}} name='Home' component={Home}/>
              <Stack.Screen options={{headerShown: false}} name='Chat' component={Home}/>
            </Stack.Navigator>
          </NavigationContainer>
        )
      }
    </>
  )
}
