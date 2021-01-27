import ScanIP from './ScanIP.js';
import ScanBarcode from './ScanBarcode.js';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const Routes = createAppContainer(
  createBottomTabNavigator({
    Home: ScanIP,
    Principal: ScanBarcode
  })
);

export default Routes;