// Import necessary components and functions
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnBoardingScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import OtpScreen from '../screens/OtpScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPwdScreen from '../screens/ForgotPwdScreen';
import ResetPwdScreen from '../screens/ResetPwdScreen'
import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import MultiStepForm from '../components/MultiStepForm';
import DescriptionForm from '../screens/DescriptionScreen';
import ManaulRequest from '../screens/ManualRequestScreen';
import ReHire from '../screens/ReHireScreen';
import BidScreen from '../screens/BidScreen';
import ViewProfile from '../screens/ViewProfile';
import HireScreen from '../screens/HireScreen';
import TrackTask from '../screens/TrackTaskScreen';
import VerifyWithdrawal from '../screens/VerifyWithdrawalScreen';
import WithdrawalSaved from '../screens/WithdrawalSavedScreen';
import WithdrawalDetails from '../screens/WithdrawalDetailsScreeen';
import EditProfile from '../screens/EditProfileScreen';
import AccountSetting from '../screens/AccountSettingsScreen';
import PaymentHistory from '../screens/PaymentHistory';


// Create a stack navigator
const Stack = createNativeStackNavigator();


// Define the navigator component
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='ForgotPwd' component={ForgotPwdScreen}/>
      <Stack.Screen name='ResetPwd' component={ResetPwdScreen}/>
      <Stack.Screen name='MultiStepForm' component={MultiStepForm}/>
      <Stack.Screen name='Description' component={DescriptionForm}/>
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='ManualRequest' component={ManaulRequest}/>
      <Stack.Screen name='ReHire' component={ReHire}/>
      <Stack.Screen name='Bids' component={BidScreen}/>
      <Stack.Screen name='ViewProfile' component={ViewProfile}/>
      <Stack.Screen name='Hire' component={HireScreen}/>
      <Stack.Screen name='Track' component={TrackTask}/>
      <Stack.Screen name='VerifyWithdrawal' component={VerifyWithdrawal}/>
      <Stack.Screen name='WithdrawalSaved' component={WithdrawalSaved}/>
      <Stack.Screen name='WithdrawalDetails' component={WithdrawalDetails}/>
      <Stack.Screen name='EditProfile' component={EditProfile}/>
      <Stack.Screen name='AccountSetting' component={AccountSetting}/>
      <Stack.Screen name='PaymentHistory' component={PaymentHistory}/>
      

    </Stack.Navigator>

    
  );
};

export default AppNavigator;
