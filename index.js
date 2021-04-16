/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Navigation from './src/components/Navigation';
import Login from './src/components/Login';
import Drawer from './src/components/DrawerScreen';

AppRegistry.registerComponent(appName, () => Navigation);
