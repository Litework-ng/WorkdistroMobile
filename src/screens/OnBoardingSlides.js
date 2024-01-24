// OnboardingSlides.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

// ... (your existing imports)

// ... (your existing imports)

const OnboardingSlides = ({ navigation }) => {
  const swiperRef = React.useRef(null);
  const [becomeWorkerActive, setBecomeWorkerActive] = useState(false);
  const [findWorkerActive, setFindWorkerActive] = useState(false)

  const handleSkip = () => {
    // Navigate to the last slide
    if (swiperRef.current) {
      swiperRef.current.scrollBy(2); // Assuming you have 3 slides (0-indexed)
    }
  };

  const handleGetStarted = () => {
    navigation.navigate('Registration');
  };

  const handleBecomeWorker = () => {
    setBecomeWorkerActive(true);
    setFindWorkerActive(false);
    // Handle navigation to the screen for becoming a worker
    // Example: navigation.navigate('BecomeWorker');
  };

  const handleFindWorker = () => {
    setBecomeWorkerActive(false);
    setFindWorkerActive(true);
    // Handle navigation to the screen for finding a worker
    // Example: navigation.navigate('FindWorker');
  };

  const renderPagination = (index, total) => {
    const indicators = [];

    for (let i = 0; i < total; i++) {
      indicators.push(
        <TouchableOpacity
          key={i}
          style={
            i === index
              ? styles.paginationActive
              : styles.paginationInactive
          }
          onPress={() => {
            if (swiperRef.current) {
              swiperRef.current.scrollBy(i - index);
            }
          }}
        />
      );
    }

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.indicators}>{indicators}</View>
        {index === total - 1 ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (swiperRef.current) {
                swiperRef.current.scrollBy(1);
              }
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsButtons={false}
      renderPagination={renderPagination}
    >
      <View style={styles.slide}>
      <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Delegate Tasks The Easy Way</Text>
        <Text style={styles.description}>Find handy workers to help with your tasks, whatever they are, wherever you are.</Text>
        <Image source={require('../../assets/images/slide1img.png')} style={styles.image} />
      </View>
      <View style={styles.slide}>
      <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Turn Your Skills To Earnings</Text>
        <Text style={styles.description}>Connect with people that need your skills close to you.</Text>
        <Image source={require('../../assets/images/slide2img.png')} style={styles.image} />
      </View>
      <View style={styles.slide}>
      <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>How Will You Be Using WorkDistro Today?</Text>
        <Text style={styles.description}>Don’t worry, you can always switch later in settings</Text>
        <View style={styles.UserSelectionContainer}>
        <TouchableOpacity
            style={[
              styles.selectionContainer,
              becomeWorkerActive && styles.activeSelection,
            ]}
            onPress={handleBecomeWorker}
          >
            <Image source={require('../../assets/images/Construction.png')} style={styles.selectionIcon} />
            <Text style={styles.selectionText}>As A Worker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectionContainer,
              findWorkerActive && styles.activeSelection,
            ]}
            onPress={handleFindWorker}
          >
            <Image source={require('../../assets/images/Personsearch.png')} style={styles.selectionIcon} />
            <Text style={styles.selectionText}>To Find A Worker</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>
  );
};






const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop:53,
  },
  description:{
    fontSize:14,
    fontWeight:400,
    color:'#595959',
    textAlign:'center',
    width:298,
  },
  image: {
    width: 350.541,
    height: 285.882,
    flexShrink: 0,
    resizeMode: 'contain',
    marginBottom: 7,
    marginTop:49,
  },
  
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:50,
    paddingHorizontal: 20,
    paddingTop: 35, // Adjust the padding to move the header down
  },
  logo:{
    width:230,
    height:48,
  },
  paginationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom:30,
  },
 
  indicators: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop:20,
  },
  paginationInactive: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#EAFDF6',
    marginHorizontal: 5,
  },
  paginationActive: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#31DE9E',
    marginHorizontal: 5,
  },

  nextButton: {
    backgroundColor: '#1F2A47',
    paddingVertical: 14,
    paddingHorizontal: 134,
    borderRadius: 15,
    width:311,
    height:50,
    justifyContent:'center',
    alignContent:'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  skipText:{
    color: '#777'
  },
  getStartedButton:{
    backgroundColor: '#1F2A47',
    paddingVertical: 14,
    paddingHorizontal: 114,
    borderRadius: 15,
    width:311,
    height:50,
    justifyContent:'center',
    alignContent:'center',
  },

  getStartedButtonText: {
    color: 'white',
    fontSize: 16,
    width:91,
    textAlign:'center',
    
  },
  UserSelectionContainer:{
    flexDirection:'row',
    gap:20,
    marginTop:32,
  },

  selectionContainer:{
    height:100,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:10,
  }, 
  selectionText:{
    fontSize:16,
    marginTop:10,
  },
  activeSelection:{
    borderColor: '#1F2A47',
    borderWidth:1,
  }
});

export default OnboardingSlides;
