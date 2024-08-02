import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faFillDrip,
  faKey,
  faUser,
  faMessage,
  faLock,
  faCircleInfo,
  faComments,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import {
  Eye,
  EyeSlash,
  InfoCircle,
  Key,
  Lock1,
  Logout,
  MessageQuestion,
  Messages2,
  User,
} from "iconsax-react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../components/Api';
import { useToast } from "../components/ToastProvider";

const MenuItems = ({ text, saxIcon, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 22,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        {saxIcon}

        <Text style={{ fontSize: 14, fontWeight: "400" }}>{text}</Text>
      </View>
      <FontAwesomeIcon icon={faChevronRight} size={24} />
    </TouchableOpacity>
  );
};
const ProfileSScreen = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showToast = useToast();
  useEffect(() => {
    const loadProfilePhoto = async () => {
      const savedProfilePhoto = await AsyncStorage.getItem('profilePhoto');
      if (savedProfilePhoto) {
        setProfilePhoto(savedProfilePhoto);
      }
    };
    loadProfilePhoto();
  }, []);

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
      // Get loginToken from AsyncStorage
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
      showToast( 'The task has been successfully canceled.');
    } catch (error) {
      console.error('Failed to upload the profile photo', error);
      showToast( "Failed to upload the profile photo.");
    }

    setIsModalVisible(false);
  };
  return (
    <ScrollView style={{ backgroundColor: "white", padding: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        Profile
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          borderRadius: 4,
          marginBottom: 20,
          marginTop: 32,
        }}
      >
        <Image
          source={profilePhoto ? {uri:profilePhoto} : require("../../assets/images/user.png")}
          style={{ width: 50, height: 50 , borderRadius:50,}}
        />
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            Ife Aduralere
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#7B7B7B" }}>
              Edit Profile
            </Text>
            <FontAwesomeIcon icon={faChevronRight} size={12} color="#7B7B7B" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 50 }}>
        <MenuItems
          saxIcon={<User size={20} color="black" />}
          text="Account Settings"
          onPress={() => navigation.navigate("AccountSetting")}
        />
        <Text
          style={{
            marginTop: 22,
            fontSize: 10,
            fontWeight: "600",
            color: "#7B7B7B",
            marginBottom: 14,
          }}
        >
          Preferences
        </Text>

        <MenuItems
          saxIcon={<Key size={20} color="black" />}
          text="Security"
          size={20}
        />
        <Text
          style={{
            marginTop: 22,
            fontSize: 10,
            fontWeight: "600",
            color: "#7B7B7B",
            marginBottom: 14,
          }}
        >
          Resources
        </Text>
        <MenuItems
          text="FAQ"
          saxIcon={<MessageQuestion size={20} color="black" />}
          onPress={() => navigation.navigate("Faq")}
        />
        <MenuItems
          text="Support"
          saxIcon={<Messages2 size={20} color="black" />}
          onPress={() => navigation.navigate("Support")}
        />
        <MenuItems
          text="Privacy"
          saxIcon={<Lock1 size={20} color="black" />}
          onPress={() => navigation.navigate("Privacy")}
        />
        <MenuItems
          text="About Us"
          saxIcon={<InfoCircle size={20} color="black" />}
          onPress={() => navigation.navigate("AboutUs")}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 22,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <Logout size={20} color="#C11414" />
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#C11414" }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            width: 172,
            height: 39,
            alignSelf: "center",
            padding: 10,
            marginTop: 132,
            borderRadius: 8,
            borderColor: "#F#1F2A47",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            Become a DistroWorker
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSScreen;
