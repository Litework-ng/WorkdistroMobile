import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Bids from '../components/Bids';
import BottomTabNavigator from '../components/BottomTabNavigator';


const BidScreen = ({navigation}) => {
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

            <Text style={{fontSize:14, fontWeight:'500'}}>Laundry</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.</Text>
            <Text style={{fontWeight:'600', fontSize:16,}}>Bids</Text>
            </View>
            <Bids navigation={navigation}/>
            <Bids navigation={navigation}/>
            </View>
            <BottomTabNavigator/>
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