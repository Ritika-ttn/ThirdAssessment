import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import MenuScreen from './MenuScreen';
import DrawerScreen from './DrawerScreen';
import {Provider} from 'react-redux';
import store from '../store/index';
import AddNotes from './AddNotes';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MenuScreen"
            component={MenuScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="DrawerScreen"
            component={DrawerScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddNotes"
            component={AddNotes}
            options={{
              title: '',
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigation;
