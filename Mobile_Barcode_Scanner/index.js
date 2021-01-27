import { AppRegistry } from 'react-native';
import { name as appName } from "./app.json";
import App from './App';
import ScanIP from './src/ScanIP';
// import ScanBarcode from './src/ScanBarcode';
// import Routes from './src/Routes';

AppRegistry.registerComponent('main', () => ScanIP);
