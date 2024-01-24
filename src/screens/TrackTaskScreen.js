import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Bids from '../components/Bids';
import BottomTabNavigator from '../components/BottomTabNavigator';


const TaskFeed =({text})=>{
    return(
        <View >
        <View style={{backgroundColor:'#F7F9FF', padding:15, flexDirection:'row', alignItems:'center', gap:20,borderRadius:4, marginBottom:20,}}>
            <Image source={require('../../assets/images/profilepic2.png')} style={{width:30, height:30}}/>
            <View>
                <Text style={{fontSize:12, fontWeight:400,}}>{text}</Text>
                <Text style={{fontSize:10, fontWeight:400, color:'rgba(0, 0, 0, 0.65)'}}>10 mins ago</Text>
            </View>
        </View>
    </View>
    )
}

const TrackTask = ({navigation,}) => {
    return(
        <View style={{ backgroundColor:'#fff', flex:1,}}>
               <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                </TouchableOpacity>
            <Text style={styles.headerText}>Track Task</Text>
            </View>
                <Text style={{fontSize:16, fontWeight:500, marginBottom:16, marginLeft:20,}}>Today</Text>
                <View style={{padding:20}}>

            <TaskFeed text='Tosin Has Received The Payment'/>
            <TaskFeed text='Tosin Has Completed The Task'/>
            <TaskFeed text='Tosin Has Begun The Task'/>
            <TaskFeed text='Tosin Is Now In Transit'/>
                </View>
        </View>
    )
};


const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:84,
        alignItems:'center',
        marginBottom:20,
        marginTop:15,
        padding:20,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },
})
export default TrackTask;