import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faTasks, faWallet, faBell, faUser,faBriefcase } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../screens/HomeScreenClient';
import TaskScreen from '../screens/TaskScreen';
import TaskScreenDemo from '../screens/TaskSCreenDemo';
import WalletScreen from '../screens/WalletScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotificationWorkerScreen from '../screens/Notificationworker';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileWorkerScreen from '../screens/ProfileWorkerScreen';
import WorkerTaskScreen from '../screens/WorkerTaskScreen';
import HomeScreenWorker from '../screens/HomeScreenWorker';
import WalletWorkerScreen from '../screens/WalletWorkerScreen'

const Tab = createBottomTabNavigator();




const WorkerBottomTabs = ({component, onpress}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1F2A47',
        tabBarInactiveTintColor: 'gray',
        showLabel: true,
        headerShown:false,
        tabBarStyle:{
            paddingTop:19,
            paddingBottom:19,
            height:84,
        },
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenWorker}
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHome} color={color} size={24} />,
        }}
        
      />
      <Tab.Screen
        name="Task"
        component={WorkerTaskScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faBriefcase} color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletWorkerScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faWallet} color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationWorkerScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faBell} color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileWorkerScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUser} color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default WorkerBottomTabs;

