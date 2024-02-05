// OnboardingSlides.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useUserContext } from '../components/UserContext';


const OnboardingSlides = ({ navigation }) => {
  const swiperRef = React.useRef(null);
  const [becomeWorkerActive, setBecomeWorkerActive] = useState(false);
  const [findWorkerActive, setFindWorkerActive] = useState(false)
 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isBecomeWorkerSelected, setIsBecomeWorkerSelected] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const allJobs = [
    'Job1',
    'Job2',
    'Job3',
    'Job4',
    'Job5',
    'CustomJob1',
    'CustomJob2',
    'CustomJob3',
    'CustomJob4',
    'CustomJob5',
  ];

  const popularJobs = ['Job1', 'Job3', 'Job5'];

 

  const handleSkip = () => {
    // Navigate to the last slide
    if (swiperRef.current) {
      swiperRef.current.scrollBy(2); // Assuming you have 3 slides (0-indexed)
    }
  };

  const handleJobSelection = (job) => {
    // Handle job selection logic
    setSelectedJobs((prevJobs) => {
      if (prevJobs.includes(job)) {
        return prevJobs.filter((prevJob) => prevJob !== job);
      } else {
        return [job];
      }
    });
    setSearchTerm('');
    setSelectedJob(job);
  };

  const { userSelection, setSelection } = useUserContext();

  const selectedUserType = userSelection;
  const setSelectedUserType = setSelection;

  const searchJobs = (text) => {
    setSearchTerm(text);
    const filtered = allJobs.filter((job) =>
      job.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredJobs(filtered);
    setSelectedJob(null);
  };


  const handleGetStarted= (userType) => {
   

    // Conditionally navigate based on user selection
    if (userType === 'becomeWorker' && selectedJob) {
      navigation.navigate('SignUpWorker');
    } else if (userType === 'findWorker') {
      navigation.navigate('SignUpClient');
    }else if (userType ==='becomeWoker' || !selectedJob){
      Alert.alert('Error', 'Please select a job before continuing.');
    }
    console.log('pressed UserSelect')

    console.log(selectedJobs)
  };

  const handleBecomeWorker = () => {
    setBecomeWorkerActive(true);
    setFindWorkerActive(false);
   setSelectedUserType('becomeWorker');
   setIsBecomeWorkerSelected(true);
   console.log('worker')
  };

  const handleFindWorker = () => {
    setBecomeWorkerActive(false);
    setFindWorkerActive(true);
    setSelectedUserType('findWorker');
    setIsBecomeWorkerSelected(false);
    console.log('client')
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
              style={[styles.getStartedButton,
                !selectedUserType && styles.disabledButton,
                selectedUserType === 'becomeWorker' && !selectedJob && styles.disabledButton,
              ]}
              onPress={() => handleGetStarted(selectedUserType)}
              disabled ={!selectedUserType}
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
      <FlatList
        data={['Slide 3']}
        style={styles.lastSlideContainer}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ScrollView style={styles.lastSlide}>
      
          <View style={styles.headerContainer}>
              <Image source={require('../../assets/images/logo.png')} style={styles.lastlogo} />
            </View>
            <View style={{alignItems:'center'}}>
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
            {isBecomeWorkerSelected && (
            <View>
            <Text style={{fontSize:16, fontWeight:'700', textAlign:'center', marginHorizontal:20, marginTop:20,}}>Select Your Speciality</Text>
            </View>
            )}
             {isBecomeWorkerSelected && (
            <View style={styles.searchContainer}>
            <TextInput
            placeholder="Search Jobs"
            value={searchTerm}
            onChangeText={searchJobs}
            style={styles.searchInput}
          />
            <FontAwesomeIcon icon={faSearch} size={24} color="#292D32" style={styles.searchIcon} />
    
            </View>
             )}
            </View>
            
              {isBecomeWorkerSelected && searchTerm.length > 0 && (
            <FlatList
            style={{marginTop:20, marginBottom:150,}}
            data={filteredJobs}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleJobSelection(item)}
                style={{
                  padding: 8,
                  paddingVertical:15,
                  marginVertical:10,
                  marginHorizontal:10,
                  marginBottom:0,
                  marginTop:0,
                  borderWidth:1,
                  borderRadius:8,
                  borderBottomWidth:0,
                  borderColor:'#CECECE',
                  backgroundColor: selectedJobs === item ? '#1F2A47' : 'white',
                 
                  
                }}
              >
                <Text style={{  color: selectedJobs === item ? 'white' : 'black', }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
            )}

          {selectedJob && isBecomeWorkerSelected && (
              <TouchableOpacity
                onPress={() => handleJobSelection(selectedJob)}
                style={{
                  padding: 8,
                  margin: 8,
                  backgroundColor: '#1F2A47',
                  borderRadius: 8,
                  width:135,
                  alignSelf:'center',
                }}
              >
                <Text style={{ color: 'white', alignSelf:'center', }}>{selectedJob}</Text>
              </TouchableOpacity>
            )}
           
            
           {isBecomeWorkerSelected && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center',  }}>
            {popularJobs.map((job) => (
              <TouchableOpacity
                key={job}
                onPress={() => handleJobSelection(job)}
                style={{
                  padding: 8,
                  paddingHorizontal:25,
                  margin: 8,
                  backgroundColor: selectedJobs.includes(job) ? '#1F2A47' : 'white',
                  borderRadius: 25,
                  borderWidth:1,
                  borderColor:'#CECECE',
                }}
              >
                <Text style={{ color: selectedJobs.includes(job) ? 'white' : 'black', }}>{job}</Text>
              </TouchableOpacity>
            ))}
          </View>
           )}
            
          </ScrollView>
        )}
      />
    
    </Swiper>
  );
};






const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lastSlide: {
    flex: 1,
    backgroundColor: '#fff',
  },

  lastSlideContainer:{
    
  },
  innerContainer:{
    alignItems:'center'
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

  lastlogo:{
      width:230,
      height:48,
      marginLeft:40,
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

  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#333333',
    height:40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth:1,
    borderColor:'#CECECE',
    marginHorizontal: 15,
    marginVertical: 15,
    paddingHorizontal: 15,
    elevation: 3,
    height:40,
    width:355,
    alignSelf:'center'
  },
  searchIcon: {
    marginRight: 0,
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

  disabledButton:{
    backgroundColor:'#6A7184',
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
