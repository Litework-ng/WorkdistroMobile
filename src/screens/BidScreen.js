import React, { useState, useEffect, } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  ScrollView,ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Bids from '../components/Bids';
import BottomTabNavigator from '../components/BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../components/Api';

const BidScreen = ({navigation, route}) => {
    const { task } = route.params;
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const jobId = task.id
    
    
  useEffect(() => {
    const fetchBids = async () => {
      try {
        console.log(jobId)
        const loginToken = await AsyncStorage.getItem('logintoken');
        const response = await api.get(`user/jobs/${jobId}/bids/`, {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        });
        setBids(response.data.response[0].bids);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch bids', error);
        setLoading(false);
      }
    };

    fetchBids();
  }, [task.id]);

    return(
        <ScrollView style={{backgroundColor:'#fff', }}>
            <View style={{paddingBottom:100,}}>
                    <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                </TouchableOpacity>
            <Text style={styles.headerText}>All Bids</Text>
            </View>
            <View style={{padding:20,}}>

            <Text style={{fontSize:14, fontWeight:'500'}}>{task.subject}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={{fontWeight:'600', fontSize:16,}}>Bids</Text>
            </View>
            {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          bids.map((bid, index) => <Bids key={index} bid={bid} navigation={navigation} task={task} />)
        )}
            </View>
           
        </ScrollView>
    )
}
 styles= StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:94,
        alignItems:'center',
        marginBottom:20,
        marginTop:25,
        padding:20,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },

    description:{
        fontSize:12,
        fontWeight:'400',
        color:'#7E7E7E',
        marginTop:5,
        marginBottom:32
    }
 })
export default BidScreen