// App.js
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/components/AppNavigator';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import CustomBottomNavBar from './src/components/CustomNavBar';

const App = ({navigation, state}) => {
  return (
    <NavigationContainer>
      <AppNavigator />
      
    </NavigationContainer>
  );
};

export default App;
