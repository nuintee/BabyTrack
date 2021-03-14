import { registerRootComponent } from 'expo';
import 'expo-asset';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import App from './App';


//registerRootComponent(App);

AppRegistry.registerComponent(appName, () => App)