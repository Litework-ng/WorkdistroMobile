import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BestMatchesScreen from '../components/BestMatches';
import MostRecentScreen from '../components/MostRecent';
import PendingTask from '../components/PendingTask';
import api from '../components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DollarSquare, Location } from "iconsax-react-native";


const HomeScreenWorker = ({navigation}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'bestMatches', title: 'Best Matches' },
        { key: 'mostRecent', title: 'Most Recent' },
        
      ]);
      const [firstName, setFirstName] = useState('');

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
      const [jobs, setJobs] = useState([]);

      const renderTabBar = (props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.tabIndicator}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
        />
      );

      useEffect(() => {
        const fetchJobs = async () => {
            try {
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

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                 <Image source={require('../../assets/images/logo.png')} style={styles.logo} />        
                 <Text style={styles.welcomeText}>Hello {firstName}</Text>
                      
              
            </View> 
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </View>
    )
};

const BestMatchesTabContent = ({ navigation, jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No jobs available</Text>
        </View>
    );
}
  const sortedJobs = [...jobs].sort((a, b) => b.budget - a.budget);
    return (
      <ScrollView style={styles.tabContent}>
        <View style={{paddingBottom:100,}}>
        {sortedJobs.map((job, index) => (
                    <JobCard key={index} job={job} navigation={navigation} />
                ))}
        </View>
      </ScrollView>
    );
  };

  

  const MostRecentTabContent = ({ navigation, jobs }) => {
    if (!jobs || jobs.length === 0) {
      return (
          <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No jobs available</Text>
          </View>
      );
  }
    const sortedJobs = [...jobs].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        return (
      <ScrollView style={styles.tabContent}>
        <View style={{paddingBottom:100,}}>
        {sortedJobs.map((job, index) => (
                    <JobCard key={index} job={job} navigation={navigation} />
                ))}
        </View>
      </ScrollView>
    );
  };
  
  const JobCard = ({ job, navigation }) => {
    const handleBid = (job) => {
      navigation.navigate('WorkerBid', { job });
  };
    return (
        <View
            style={{
                borderWidth: 1,
                padding: 15,
                borderRadius: 4,
                marginTop: 20,
                borderColor: "#E4E4E4",
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Text style={styles.taskTitle}>{job.subject}</Text>
                </View>
                <TouchableOpacity>
                    {/* Placeholder for icon */}
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontSize: 12,
                    fontFamily: 'Manrope-Regular',
                    color: "#7E7E7E",
                    width: 303,
                    height: 36,
                    marginTop: 10,
                }}
            >
                {job.description}
            </Text>
            <View style={styles.detailsContainer}>
                <View style={styles.itemDetailsContainer}>
                <Location size={16} color="#7E7E7E" />
                    <Text style={styles.locationText}>{job.location}</Text>
                </View>
                <View style={styles.itemDetailsContainer}>
                <DollarSquare size={16} color="#7E7E7E" />
                    <Text style={styles.paymentText}>{job.paymentMethod}</Text>
                </View>
            </View>
            <Text style={styles.budgetText}>Budget: N{job.budget}</Text>
            <TouchableOpacity
                style={styles.ViewBidButton}
                onPress={() => handleBid(job)}
            >
                <Text style={styles.ViewBidText}>Bid</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor:'#fff'
      },
        headerContainer:{
            padding:20,
        }, 

        logo: {
            width:230,
            height:48,
            marginBottom: 37,
            marginTop:20,
            justifyContent:'center',
            alignSelf:'center'
          },

         welcomeText:{
            fontSize:18,
            fontWeight:'700',
            fontFamily: 'Manrope-Bold',
            marginBottom:8,
            color:'#1A1A1A',
          },
          tabIndicator: {
            backgroundColor:  '#1F2A47', // Customize the indicator color
          },
          tabBar: {
            backgroundColor: 'white', // Customize the tab bar background color
          },
          tabLabel: {
            color: 'black',
            textTransform: 'none' ,
            fontSize:14,
            fontWeight:'500',
            fontFamily: 'Manrope-Medium',
          },
          tabContent: {
            flex:1,
            padding:20,   
          },

          taskTitle: {
            fontSize: 14,
            fontWeight: "500",
            fontFamily: 'Manrope-Medium',
          },
          detailsContainer: {
            flexDirection: "row",
            gap: 32,
            marginTop: 10,
            padding: 0,
          },
          itemDetailsContainer: {
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
            gap: 2,
          },
          paymentText: {
            fontSize: 12,
            color: "#7E7E7E",
            alignSelf: "center",
            fontWeight: "400",
            fontFamily: 'Manrope-Regular',
          },
          locationText: {
            fontSize: 12,
            color: "#7E7E7E",
            alignSelf: "center",
            fontWeight: "400",
            fontFamily: 'Manrope-Regular',
          },
          budgetText: {
            marginTop: 18,
            fontSize: 12,
            fontWeight: "500",
            fontFamily: 'Manrope-Medium',
          },
          ViewBidButton: {
            backgroundColor: "#1F2A47",
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: 169,
        
            marginBottom: 6,
            marginTop: 40,
          },
        
          ViewBidText: {
            color: "white",
            fontWeight: "700",
            fontSize: 16,
            fontFamily: 'Manrope-Bold',
          },
})
export default HomeScreenWorker;