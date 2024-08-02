import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Easing, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useNotification from '../hooks/useNotifications'; // Assuming you have this hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../components/Api'
import { Location } from 'iconsax-react-native';
import { AirbnbRating } from 'react-native-ratings';

const WorkerNotifications = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [countdown, setCountdown] = useState(20);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const countdownRef = useRef(null);
  const [rating, setRating] = useState(0);
  const handleRating = (ratedValue) => {
      // Handle the rated value (1 to 5) as needed
      setRating(ratedValue);
    };


  const { notifications } = useNotification('worker');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginToken = await AsyncStorage.getItem('logintoken');
        if (loginToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        Alert.alert('Error', 'Failed to check login status.');
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn && notifications.length > 0) {
      const newNotification = notifications[0];
      // Only handle notification if it's different from the current one
      if (!currentNotification || currentNotification.id !== newNotification.id) {
        handleNotification(newNotification);
      }
    }
  }, [notifications, isLoggedIn]);

  const handleNotification = (notification) => {
    setCurrentNotification(notification);
    console.log(currentNotification)
    setIsModalVisible(true);

    // Slide-up animation for modal
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    if (notification.notification_type === 'job_offered') {
      startCountdown();
    }
  };

  const startCountdown = () => {
    // Clear any existing interval before starting a new one
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    setCountdown(25);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          countdownRef.current = null; // Clear the reference
          handleWorkerResponse(false); // Automatic decline on timeout
          closeModal();
          return 0; // Ensures countdown stops at zero
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Cleanup effect for when component unmounts
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const handleWorkerResponse = async (isAvailable) => {
    try {
      const loginToken = await AsyncStorage.getItem('logintoken');
      await api.post('/user/worker/response/', { available: isAvailable }, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      showModalContent(isAvailable ? 'accepted' : 'declined');
    } catch (error) {
      console.error('Failed to send response', error);
      Alert.alert('Error', 'Failed to send response.');
    }
  };

  const showModalContent = (status) => {
    setCurrentNotification((prev) => ({
      ...prev,
      response: status,
    }));
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  const renderModalContent = () => {
    if (!currentNotification) return null;
    if (currentNotification.response) {
      return <Text>You have {currentNotification.response} the job.</Text>;
    }
    return (
      <>
      <Text style={styles.headerText}>Respond To Job</Text>
      <View style={{borderColor:'#E1E1E1', borderBottomWidth:1,}}>
      <Text style={styles.taskTitle}>Laundry</Text>
      <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.</Text>
      <View>
      <View style={styles.itemDetailsContainer}>
            <Location size={16} color='#7E7E7E'/>
            <Text style={styles.locationText}>Ikorodu, Lagos</Text>
        </View>
        <Text style={styles.budgetText}>Amount: N,7000</Text>

      <Text style={{fontSize:12,fontWeight:'500', fontFamily:'Manrope', color:'#818181', marginTop:16, marginBottom:5,}}>Distro</Text>
      <View style={{flexDirection:'row', gap:5, marginBottom :20,}}>
            <Image source={require('../../assets/images/profilepic.png')} style={styles.profilepic} />
            <View >
                <Text style={{fontSize:12, fontWeight:'400', fontFamily:'Manrope',}}>Tosin Alabi</Text>
                <AirbnbRating
                    count={5}
                    reviews={[ ]}
                    defaultRating={0}
                    size={10}
                    onFinishRating={handleRating}
                    ratingContainerStyle={{padding:0,margin:0, }}
                    starContainerStyle={{ margin:0,padding:0, gap:-4,}}
                    showRating={false}
                />
            </View>
        </View>
      </View>
      </View>
        <View style={styles.countdownText}>
        <Text style={{fontFamily:'Manrope', fontWeight:'500', fontSize:14,}}>{countdown} sec...</Text>
        </View>
        <Text style={styles.infoText}>Are you available to take this Job?</Text>
        <TouchableOpacity style={styles.acceptButton} onPress={() => handleWorkerResponse(true)}>
          <Text style={styles.acceptButtonText}>Yes, I’m Available</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={() => handleWorkerResponse(false)}>
          <Text style={styles.declineButtonText}>No, I'm Unavailable</Text>
        </TouchableOpacity>
      </>
    );
  };

  if (!isLoggedIn) {
    return null; // Don't render anything if not logged in
  }

  return (
    <Modal visible={isModalVisible} transparent={true} animationType="none">
      <Animated.View style={[styles.modalContainer, {
        transform: [{
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [500, 0],
          }),
        }],
      }]}>
        <View style={styles.modalContent}>
          {renderModalContent()}
        </View>
      </Animated.View>
    </Modal>
  );
};


const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    height:'80%'
  },
  headerText:{
    fontFamily:'Manrope',
    fontWeight:'600',
    fontSize:16,
    marginBottom:20,
  },
  profilepic:{
    width:25,
    height:25,
},
  taskTitle:{
    fontSize:14,
    fontWeight:'500',
},
description:{
  fontSize:12,
   color:'#7E7E7E',  
   marginBottom:10,  
   marginTop:8,
    
},
itemDetailsContainer:{
    flexDirection:'row',
    gap:2,
    marginBottom:5,
}, 

locationText:{
    fontSize:12,
    color:'#7E7E7E',
    alignSelf:'center',
    fontWeight:'400',
}, 
budgetText:{
    marginTop:15,
    fontSize:12,
    fontWeight:'500',
    fontFamily:'Manrope',
    marginBottom:10,
},
  countdownText:{
    padding:11,
    borderRadius:100,
    backgroundColor:'#E2EAFF',
    marginTop:20,
  },
  infoText:{
    color: '#000',
    fontWeight: '500',
    fontSize:14,
    fontFamily:'Manrope',
    marginVertical:10,

  },
  acceptButton: {
    backgroundColor: '#1F2A47',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    width:335,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize:14,
    fontFamily:'Manrope',
    textAlign:'center',

  },
  declineButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  declineButtonText: {
    color: '#1F2A47',
    fontWeight: '500',
    fontSize:14,
    fontFamily:'Manrope',
    
  },
}) 

export default WorkerNotifications;
