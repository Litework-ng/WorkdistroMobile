// App.js
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/components/AppNavigator';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import CustomBottomNavBar from './src/components/CustomNavBar';
import { UserProvider } from './src/components/UserContext';

const App = ({navigation, state}) => {
  return (
    <UserProvider>

    <NavigationContainer>
      <AppNavigator />
      
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
