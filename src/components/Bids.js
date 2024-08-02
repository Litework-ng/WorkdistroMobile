import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';
import { Briefcase, Location } from "iconsax-react-native";
import { timeAgo } from "./TimeAgo";
import api from './Api';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Bids = ({ navigation, bid, task }) => {
  const [rating, setRating] = useState(0);
  const jobId = task.id;
  const bidId = bid.id;
  const handleRating = (ratedValue) => {
    // Handle the rated value (1 to 5) as needed
    setRating(ratedValue);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const formattedTimeAgo = timeAgo(bid.date_created);

  
  const handleHire = async (jobId, bidId) => {
    try {
      const loginToken = await AsyncStorage.getItem('logintoken');
      if (!loginToken) {
        Alert.alert("Error", "No login token found. Please log in again.");
        return;
      }

      const response = await api.post(`user/job/hire/${jobId}/`, 
      {
        bid_id: bidId,
      },
      {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });

      if (response.status === 201) {
        setIsModalVisible(true);
        startCountdown();
      } else {
       
        console.log( 'Failed to hire the worker. 0' , response);
      }
    } catch (error) {
      console.log({jobId, bidId})
      console.log('Failed to hire the worker', error);
      Alert.alert('Error', 'An error occurred while trying to hire the worker.');
    }
  };

  
  const startCountdown = () => {
    let timeLeft = 25;
    const interval = setInterval(() => {
      timeLeft -= 1;
      setProgress((prevProgress) => prevProgress + 5);

      if (timeLeft === 0) {
        clearInterval(interval);
        checkWorkerResponse();
      }
    }, 1000);
  };
  const checkWorkerResponse = async () => {
    // Implement the logic to check the worker's response from the server
    // For example:
    const response = await api.get(`/user/job/hire/check-response/${jobId}/`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('logintoken')}`,
      },
    });

    if (response.data.available) {
      setResult('Worker is available!');
    } else {
      setResult('Worker is not available.');
    }

    setIsModalVisible(false);
  };


  return (
    <View
      style={{
        borderWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        borderColor: "#D0D0D0",
        marginBottom: 20,
      }}
    >
            <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {result ? (
              <Text>{result}</Text>
            ) : (
              <>
            <View style={styles.modalHeader}>
            <ProgressBar progress={progress} />
               <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                   <FontAwesomeIcon icon={faClose} style={{marginVertical:10, left:35, bottom:15,}}/>

              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Processing...</Text>
            <Text style={styles.modalSubTitle}>Your request is being processed</Text>
            <Text style={styles.modalDescription}>Please wait while we confirm worker availability to your task. This may take a few moments.</Text>
            
            </>
            )}
          </View>
          
        </View>
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <Image
            source={bid.worker.profile_photo ? { uri: bid.worker.profile_photo } : require("../../assets/images/profilepic2.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <View style={{ flexDirection: "row", gap: 140 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", fontFamily:'Manrope',  }}>{bid.worker.name}</Text>
            <Text style={{ fontSize: 10, fontWeight: "400", color: "#636363" , fontFamily:'Manrope', }}>
             {formattedTimeAgo}
            </Text>
          </View>
          <AirbnbRating
            count={5}
            defaultRating={bid.rating}
            size={10}
            onFinishRating={handleRating}
            ratingContainerStyle={{
              padding: 0,
              margin: 0,
              alignSelf: "flex-start",
            }}
            starContainerStyle={{ margin: 0, padding: 0, gap: -4 }}
            showRating={false}
          />
          <View style={{ flexDirection: "row", gap: 32 }}>
            <View
              style={{ flexDirection: "row", alignContent: "center", gap: 5 }}
            >
              <Briefcase size={10} style={{ marginTop: 2 }} color="#6B6B6B" />
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: "#6B6B6B",fontFamily:'Manrope',  }}
              >
               {bid.jobsCompleted} 20 jobs completed
              </Text>
            </View>
          </View>
          <Text
            style={{ fontSize: 14, fontWeight: "600", alignSelf: "flex-start", fontFamily:'Manrope', }}
          >
            Bid: N{bid.bid}
          </Text>
        </View>
      </View>
      
            <View
              style={{ flexDirection: "row", alignContent: "center", gap: 5, marginTop:20, }}
            >
              <Location size={10} style={{ marginTop: 2 }} color="#6B6B6B" />
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: "#6B6B6B", fontFamily:'Manrope',  }}
              >
                {bid.worker.location}
              </Text>
            </View>

      <Text style={{ fontSize: 14, fontWeight: "600", marginTop: 15, fontFamily:'Manrope',  }}>
        Cover Letter
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "400",
          color: "#3F3F3F",
          marginTop: 10,
          width: 335,
        }}
      >
        {bid.cover_letter}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 32,
          alignSelf: "center",
          marginTop: 27,
        }}
      >
        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={() => navigation.navigate("ViewProfile")}
        >
          <Text style={styles.viewProfileButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.hireButton}
          onPress={() => handleHire(jobId, bidId)}
        >
          <Text style={styles.hireButtonText}>Hire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProgressBar = ({ progress }) => (
  <View style={styles.progressBar}>
    <View style={[styles.progress, { width: `${progress}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  viewProfileButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 119,
    borderWidth: 1,
  },
  viewProfileButtonText: {
    fontWeight: "700",
    fontFamily:'Manrope'
  },

  hireButton: {
    backgroundColor: "#1F2A47",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 119,
  },
  hireButtonText: {
    color: "white",
    fontWeight: "700",
    fontFamily:'Manrope'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    margin:10,
  },
  modalHeader:{
    alignSelf:'center',
    flexDirection:'row',
    
},
  progressBar: {
    width: '70%',
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 30,
  },
  progress: {
    height: '100%',
    backgroundColor: "#1F2A47",
    borderRadius: 5,
  },
  modalTitle:{
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.12,
    textAlign: 'center',
    marginTop:30,
    
  },
  modalSubTitle:{
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16.39,
    textAlign: 'center',
    marginTop:20,
  },

  modalDescription:{
    fontFamily: 'Manrope',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 13.61,
    textAlign: 'center',
    marginTop:10,
  },


  
});

export default Bids;
