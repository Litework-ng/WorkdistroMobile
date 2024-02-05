import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BestMatchesScreen from '../components/BestMatches';
import MostRecentScreen from '../components/MostRecent';
import PendingTask from '../components/PendingTask';


const HomeScreenWorker = ({navigation}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'bestMatches', title: 'Best Matches' },
        { key: 'mostRecent', title: 'Most Recent' },
        
      ]);

      const renderScene = SceneMap({
        bestMatches: () => <BestMatchesTabContent navigation={navigation}/>,
        mostRecent: () => <MostRecentTabContent navigation={navigation} />,
       
      });

      const renderTabBar = (props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.tabIndicator}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
        />
      );
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                 <Image source={require('../../assets/images/logo.png')} style={styles.logo} />        
                 <Text style={styles.welcomeText}>Hello Tee</Text>
                      
              
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

const BestMatchesTabContent = ({ navigation }) => {
    
    return (
      <ScrollView style={styles.tabContent}>
        <View style={{paddingBottom:100,}}>
            
        <BestMatchesScreen navigation={navigation}/>
        <BestMatchesScreen  navigation={navigation}/>
        </View>
      </ScrollView>
    );
  };

  

  const MostRecentTabContent = ({ navigation }) => {
   
    return (
      <ScrollView style={styles.tabContent}>
        <View style={{paddingBottom:100,}}>
        <MostRecentScreen navigation={navigation}/>
        <MostRecentScreen  navigation={navigation}/>
        </View>
      </ScrollView>
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
            fontWeight:'500',// Customize the tab label color
          },
          tabContent: {
            flex:1,
            padding:20,
            
          
          },
})
export default HomeScreenWorker;