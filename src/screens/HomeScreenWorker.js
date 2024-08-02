import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, Modal, Alert, ActivityIndicator } from 'react-native';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BestMatchesTabContent from '../components/BestMatches'
import MostRecentTabContent from '../components/MostRecent';
import api from '../components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Send2, Camera, Flag } from 'iconsax-react-native';
import { useUserContext } from '../components/UserContext';
import { useToast } from '../components/ToastProvider';
import * as ImagePicker from 'expo-image-picker';

const HomeScreenWorker = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'bestMatches', title: 'Best Matches' },
    { key: 'mostRecent', title: 'Most Recent' },
  ]);
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { setSelection } = useUserContext();
  const [isUploading, setIsUploading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    const checkProfilePhoto = async () => {
      const loginToken = await AsyncStorage.getItem('logintoken');
      if (loginToken) {
        try {
          const response = await api.get('user/', {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          });
          const user = response.data.response;
          if (!user.profile_photo) {
            setIsModalVisible(true);
          } else {
            setProfilePhoto(user.profile_photo);
            await AsyncStorage.setItem('profilePhoto', user.profile_photo);
          }
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      }
    };

    checkProfilePhoto();
  }, []);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setSelection('becomeWorker');
        const token = await AsyncStorage.getItem('logintoken');
        if (token) {
          const response = await api.get('worker/feed/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setJobs(response.data.response);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const getFirstName = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }
      } catch (error) {
        console.error('Error retrieving first name', error);
      }
    };

    getFirstName();
    fetchJobs();
  }, []);

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleUploadPhoto = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "You've refused to allow this app to access your photos!");
      return;
    }

    // Let the user pick an image from their device
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });

    if (pickerResult.canceled) {
      console.log('Image selection cancelled');
      return;
    }

    const selectedImage = pickerResult.assets[0].uri;
    console.log('Selected Image URI:', selectedImage);

    if (!selectedImage) {
      console.error('No image selected');
      return;
    }

    try {
      setIsUploading(true);
      const loginToken = await AsyncStorage.getItem('logintoken');

      if (!loginToken) {
        Alert.alert("Error", "No login token found. Please log in again.");
        return;
      }

      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });

      // Upload the image to the backend
      const response = await api.patch('user/', formData, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image upload response:', response.data);

      // Save the uploaded image URI to AsyncStorage and update the state
      await AsyncStorage.setItem('profilePhoto', selectedImage);
      setProfilePhoto(selectedImage);
      showToast( 'Profile photo uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload the profile photo', error);
      showToast( "Failed to upload the profile photo.");
    }
    finally {
      setIsUploading(false);
      setIsModalVisible(false);
    }
    
  };


  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'bestMatches':
        return <BestMatchesTabContent navigation={navigation} jobs={jobs} />;
      case 'mostRecent':
        return <MostRecentTabContent navigation={navigation} jobs={jobs} />;
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:'row', marginBottom:20, paddingLeft:110,  justifyContent:'space-between', width:300,}}>

            <View style={styles.cameraIconContainer}>
              <Camera size={42} color="#000"/>
            </View>
            <TouchableOpacity style={{}}  onPress={() => setIsModalVisible(false)}>

            <FontAwesomeIcon icon={faClose} size={16} color="#000" />
            </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Improve your chances of hiring the right candidate by adding a friendly profile photo</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
            {isUploading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.uploadButtonText}>Upload</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.welcomeText}>Hello {firstName}</Text>
          <View style={styles.locationInputContainer}>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={handleAddressChange}
              placeholder="Set your location..."
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.LocationAddContainer}>
              <Send2 size={20} color="#fff" variant="Bold" />
            </TouchableOpacity>
          </View>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
  },
  logo: {
    width: 230,
    height: 48,
    marginBottom: 37,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope-Bold',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  input: {
    height: 40,
    width: 291,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    paddingLeft: 10,
    color: '#1A1A1A',
    borderRadius: 4,
  },
  tabIndicator: {
    backgroundColor: '#1F2A47',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabLabel: {
    color: 'black',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  LocationAddContainer: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#1F2A47',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign:'center',
    marginVertical:20,
  },
  modalContent: {
    width: 340,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    
  },
  modalTitle: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily:'Manrope-Regular',
    textAlign:'center',
  },
  cameraIconContainer:{
    backgroundColor:'#E2EAFF',
    borderRadius:50,
    padding:12,
    justifyContent:'center',
    alignContent:'center',
  },
  uploadButton: {
    paddingVertical: 20,
    paddingHorizontal: 90,
    backgroundColor: '#1F2A47',
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'Manrope',
    fontWeight:'700',
  },
});

export default HomeScreenWorker;
