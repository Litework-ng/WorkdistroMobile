// Import necessary components and functions
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnBoardingScreen';
import RegistrationScreenWorker from '../screens/RegistrationScreenWorker';
import RegistrationScreenClient from '../screens/RegistrationScreenClient';
import OtpScreen from '../screens/OtpScreen';
import OtpVerificationWorkerScreen from '../screens/OtpWorkerScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPwdScreen from '../screens/ForgotPwdScreen';
import ResetPwdScreen from '../screens/ResetPwdScreen'
import HomeScreen from '../screens/HomeScreenClient';
import BottomTabNavigator from './BottomTabNavigator';
import MultiStepForm from '../components/MultiStepForm';
import EditableForm from './EditableForm';
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
import HomeScreenWorker from '../screens/HomeScreenWorker';
import WorkerBidScreen from '../screens/WokerBidScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import WorkerTaskScreen from '../screens/WorkerTaskScreen';
import LoginWorkerScreen from '../screens/LoginWorkerScreen';
import UpdatedTask from '../screens/UpdateTask';
import Faq from '../screens/Faq';
import Support from '../screens/Support';
import Privacy from '../screens/Privacy';
import AboutUs from '../screens/AboutUs';
import { useUserContext } from './UserContext';
import BottomNavigator from './BottomTabNavigator';

// Create a stack navigator
const Stack = createNativeStackNavigator();


// Define the navigator component
const AppNavigator = () => {
  const { userSelection } = useUserContext();
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="BottomTabs" component={BottomTabsWrapper}  />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignUpClient" component={RegistrationScreenClient} />
      <Stack.Screen name="SignUpWorker" component={RegistrationScreenWorker} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name= "OtpWorkerScreen" component={OtpVerificationWorkerScreen}/>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='ForgotPwd' component={ForgotPwdScreen}/>
      <Stack.Screen name='ResetPwd' component={ResetPwdScreen}/>
      <Stack.Screen name='MultiStepForm' component={MultiStepForm}/>
      <Stack.Screen name='EditableForm' component={EditableForm}/>
      <Stack.Screen name='Description' component={DescriptionForm}/>
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='HomeWorker' component = {HomeScreenWorker}/>
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
      <Stack.Screen name ='WorkerBid' component = {WorkerBidScreen}/>
      <Stack.Screen name= 'JobDetails' component={JobDetailsScreen}/>
      <Stack.Screen name= 'WorkerTask' component={WorkerTaskScreen}/>
      <Stack.Screen name= 'LoginWorker' component={LoginWorkerScreen}/>
      <Stack.Screen name= 'UpdatedTask' component={UpdatedTask}/>
      <Stack.Screen name= 'Faq' component={Faq}/>
      <Stack.Screen name= 'Privacy' component={Privacy}/>
      <Stack.Screen name= 'Support' component={Support}/>
      <Stack.Screen name= 'AboutUs' component={AboutUs}/>

    </Stack.Navigator>

    
  );
};
    const BottomTabsWrapper = () => {
      const { userSelection } = useUserContext(); 
      return (
        <BottomNavigator userSelection={userSelection} />
      );
    };
export default AppNavigator;
