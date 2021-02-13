import { AppRegistry } from 'react-native';
import { name as appName } from "./app.json";
import App from './App';
import IP from './src/IP';
import ScanBarcode from './src/ScanBarcode';

AppRegistry.registerComponent('main', () => ScanBarcode);
