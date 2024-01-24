import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faTasks, faWallet, faBell, faUser,faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const CustomBottomNavBar = ({   }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const navigation = useNavigation();
  const route = useRoute();
  
  const isActive = (screenName) => route.name === screenName;

  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 19, backgroundColor: '#fff', height:82, borderTopWidth:1, borderColor:'#A4A4A4',  }}>
      <TouchableOpacity onPress={() => navigateToScreen('MultiStepForm')}  style={[styles.tab, isActive('Description') && styles.activeTab]}>
      <FontAwesomeIcon icon={faHome} size={24} color={isActive('MultiStepForm') ? '#1F2A47' : 'grey'}  />
        <Text style={{ fontSize:12, color: isActive('MultiStepForm') ? '#1F2A47' : 'grey' }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToScreen('Task')} style={[styles.tab, isActive('Task') && styles.activeTab]}>
      <FontAwesomeIcon icon={faBriefcase} size={24} color={isActive('Task') ? '#1F2A47' : 'grey'}  />
        <Text style={{ fontSize:12, color: isActive('Task') ? '#1F2A47' : 'grey' }}>Task</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToScreen('Wallet')} style={[styles.tab, isActive('Wallet') && styles.activeTab]}>
      <FontAwesomeIcon icon={faWallet} size={24} color={isActive('Wallet') ? '#1F2A47' : 'grey'} />
        <Text style={{ fontSize:12, color: isActive('Wallet') ? '#1F2A47' : 'grey' }}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToScreen('Notifications')} style={[styles.tab, isActive('Notifications') && styles.activeTab]}>
      <FontAwesomeIcon icon={faBell}  size={24} color={isActive('Notifications') ? '#1F2A47' : 'grey'} />
        <Text style={{ fontSize:12, color: isActive('Notifications') ? '#1F2A47' : 'grey' }}>Notifications</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigateToScreen('Profile')} style={[styles.tab, isActive('Profile') && styles.activeTab]}>
        <FontAwesomeIcon icon={faUser} size={24} color={isActive('Profile') ? '#1F2A47' : 'grey'} />
        <Text style={{ fontSize:12, color: isActive('Profile') ? '#1F2A47' : 'grey' }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    tab:{
        alignItems:'center',
    }
})
export default CustomBottomNavBar;
