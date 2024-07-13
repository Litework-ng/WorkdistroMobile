// OnboardingSlides.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useUserContext } from "../components/UserContext";
import { useUserActivity } from "../components/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JobContext } from "./jobContext";

const OnboardingSlides = ({ navigation, route }) => {
  const swiperRef = React.useRef(null);
  const { handleUserActivity } = useUserActivity();
  const [becomeWorkerActive, setBecomeWorkerActive] = useState(false);
  const [findWorkerActive, setFindWorkerActive] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isBecomeWorkerSelected, setIsBecomeWorkerSelected] = useState(false);
  
  const [services, setServices] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const { selectedJobContext } = useContext(JobContext);
  const popularJobs = ["Job1", "Job3", "Job5"];
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
    setSearchTerm("");
    setSelectedJob(job);
    handleUserActivity();
  };

  const { userSelection, setSelection } = useUserContext();
 

 

  const handleGetStarted = async (userType) => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");

      // Conditionally navigate based on user selection
      if (userType === "becomeWorker" ) {
        navigation.navigate("SignUpWorker");
      } else if (userType === "findWorker") {
        navigation.navigate("SignUpClient");
      
      }
      console.log("pressed UserSelect");

      console.log(selectedJobs);
    } catch (error) {
      console.error("Failed to save onboarding status to storage", error);
    }
  };

  const loadServicesFromStorage = async () => {
    try {
      const storedServices = await AsyncStorage.getItem("services");
      const jobSelected = await AsyncStorage.getItem("selectedJobAsync");
     
      if (storedServices) {
        const servicesData = JSON.parse(storedServices);
        setServices(servicesData);

        // Transform the services data to match the allJobs structure
        const jobsArray = servicesData.map((service) => `  ${service.name}`);
        setAllJobs(jobsArray);
        console.log(allJobs);
      }
    } catch (error) {
      console.error("Failed to load services from storage", error);
    }
  };
  

  useEffect(() => {
    loadServicesFromStorage();
    
  }, []);
 

  const handleBecomeWorker = () => {
    setBecomeWorkerActive(true);
    setFindWorkerActive(false);
    setSelection("becomeWorker");
    setIsBecomeWorkerSelected(true);
    navigation.navigate("JobSelectionModal");
   
  };

  const handleFindWorker = () => {
    setBecomeWorkerActive(false);
    setFindWorkerActive(true);
    setSelection("findWorker");
    setIsBecomeWorkerSelected(false);
    
  };

  const renderPagination = (index, total) => {
    const indicators = [];

    for (let i = 0; i < total; i++) {
      indicators.push(
        <TouchableOpacity
          key={i}
          style={
            i === index ? styles.paginationActive : styles.paginationInactive
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
              style={[
                styles.getStartedButton,
                !userSelection && styles.disabledButton,
               
              ]}
              onPress={() => handleGetStarted(userSelection)}
              disabled={!userSelection}
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
      style={{ height: 410, marginBottom: 130 }}
    >
      <View style={styles.slide}>
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 30,
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={styles.iconLogo}
            />
            <Image
              source={{
                uri: "https://nodal-episode-400211.firebaseapp.com/splashImg.png",
              }}
              style={styles.wordLogo}
            />
          </View>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Delegate Tasks The Easy Way</Text>
        <Text style={styles.description}>
          Find handy workers to help with your tasks, whatever they are,
          wherever you are.
        </Text>
        <Image
          source={require("../../assets/images/slide1img.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.slide}>
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 30,
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={styles.iconLogo}
            />
            <Image
              source={require("../../assets/splashImg.png")}
              style={styles.wordLogo}
            />
          </View>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Turn Your Skills To Earnings</Text>
        <Text style={styles.description}>
          Connect with people that need your skills close to you.
        </Text>
        <Image
          source={require("../../assets/images/slide2img.png")}
          style={styles.image}
        />
      </View>
      <FlatList
        data={["Slide 3"]}
        style={styles.lastSlideContainer}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ScrollView style={styles.lastSlide}>
            <View style={styles.headerContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 30,
                }}
              >
                <Image
                  source={require("../../assets/icon.png")}
                  style={styles.iconLogo}
                />
                <Image
                  source={require("../../assets/splashImg.png")}
                  style={styles.wordLogo}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>
                How Will You Be Using WorkDistro Today?
              </Text>
              <Text style={styles.description}>
                Don’t worry, you can always switch later in settings
              </Text>
              <View style={styles.UserSelectionContainer}>
                <View>

                <TouchableOpacity
                  style={[
                    styles.selectionContainer,
                    becomeWorkerActive && styles.activeSelection,
                  ]}
                  onPress={handleBecomeWorker}
                >
                  <Image
                    source={require("../../assets/images/Construction.png")}
                    style={styles.selectionIcon}
                  />
                  <Text style={styles.selectionText}>As A Worker</Text>
                </TouchableOpacity>
                            {selectedJobContext && userSelection === 'becomeWorker' && (
                <View style={styles.jobSelectedContainer}>
                  <Text style={{
                    borderWidth: 1,
                    borderRadius: 16,
                    color: "#1F2A47",
                    padding: 5,
                    fontFamily: 'Manrope-Bold',
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                    {selectedJobContext}
                  </Text>
                </View>
              )}
                </View>
                <TouchableOpacity
                  style={[
                    styles.selectionContainer,
                    findWorkerActive && styles.activeSelection,
                  ]}
                  onPress={handleFindWorker}
                >
                  <Image
                    source={require("../../assets/images/Personsearch.png")}
                    style={styles.selectionIcon}
                  />
                  <Text style={styles.selectionText}>To Find A Worker</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      />
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",

    backgroundColor: "#fff",
  },
  lastSlide: {
    flex: 1,

    backgroundColor: "#fff",
  },

  lastSlideContainer: {},
  innerContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 53,
    fontFamily: "Manrope-SemiBold",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#595959",
    textAlign: "center",
    width: 298,
    fontFamily: "Manrope-Medium",
  },
  image: {
    width: 350.541,
    height: 285.882,
    flexShrink: 0,
    resizeMode: "contain",
    marginBottom: 7,
    marginTop: 49,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
    paddingHorizontal: 20,

    paddingTop: 35, // Adjust the padding to move the header down
  },
  jobSelectedContainer:{
      marginTop:8,
  },
  logo: {
    width: 230,
    height: 48,
  },
  iconLogo: {
    width: 48,
    height: 48,
  },
  wordLogo: {
    width: 182,
    height: 48,
  },

  lastlogo: {
    width: 230,
    height: 48,
    marginLeft: 40,
  },
  paginationContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 50,

    backgroundColor: "#fff",
  },

  indicators: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
  },
  paginationInactive: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#EAFDF6",
    marginHorizontal: 5,
  },
  paginationActive: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#31DE9E",
    marginHorizontal: 5,
  },

  nextButton: {
    backgroundColor: "#1F2A47",
    paddingVertical: 14,
    paddingHorizontal: 134,
    borderRadius: 15,
    width: 311,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Manrope-Medium",
  },
  skipText: {
    color: "#777",
    fontFamily: "Manrope-Regular",
    marginTop: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CECECE",
    marginHorizontal: 15,
    marginVertical: 15,
    paddingHorizontal: 15,
    elevation: 3,
    height: 40,
    width: 355,
    alignSelf: "center",
  },
  searchIcon: {
    marginRight: 0,
  },
  getStartedButton: {
    backgroundColor: "#1F2A47",
    paddingVertical: 14,
    paddingHorizontal: 114,
    borderRadius: 15,
    width: 311,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
  },

  getStartedButtonText: {
    color: "white",
    fontSize: 16,
    width: 91,
    textAlign: "center",
    fontFamily: "Manrope-Medium",
  },

  disabledButton: {
    backgroundColor: "#6A7184",
  },
  UserSelectionContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 32,
  },

  selectionContainer: {
    height: 100,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectionText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Manrope-Regular",
  },
  activeSelection: {
    borderColor: "#1F2A47",
    borderWidth: 1,
  },
});

export default OnboardingSlides;
