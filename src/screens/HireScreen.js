import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch , faEdit, faLocationDot, faDollarSign, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Bids from '../components/Bids';
import BottomTabNavigator from '../components/BottomTabNavigator';


const HireScreen = ({navigation}) => {
    return(
        <View style={{backgroundColor:'#fff'}}>
            <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>Review</Text>
             </View>
            <View style={{}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:10, paddingBottom:20, borderBottomWidth:1, borderColor:'#DDDDDD', marginBottom:15,}}>
                <Image source={require('../../assets/images/profilepic2.png')} style={{width:50, height:50, marginLeft:20,}}/>
                <Text style={{fontSize:16, fontWeight:'600', }}>Hire Tosin Alabi For: Laundry</Text>
            </View>
            <View style={{paddingHorizontal:20, flexDirection:'row', gap:152, marginBottom:30,}}>
                <Text style={{fontSize:14, fontWeight:'500',}}>Payment Method</Text>
                <Text style={{fontSize:14, fontWeight:'400',}}>Cash</Text>
            </View>
            <View style={{paddingHorizontal:20, flexDirection:'row', justifyContent:'space-between', marginBottom:30,}}>
                <Text style={{fontSize:14, fontWeight:'500',}}>Amount</Text>
                <Text style={{fontSize:14, fontWeight:'400',}}>N5000.00</Text>
            </View>
            <View style={{paddingHorizontal:20, flexDirection:'row', justifyContent:'space-between', marginBottom:30,}}>
                <Text style={{fontSize:14, fontWeight:'500',}}>Discount</Text>
                <Text style={{fontSize:14, fontWeight:'400',}}>N0.00</Text>
            </View>
            <View style={{paddingHorizontal:20, flexDirection:'row', justifyContent:'space-between', marginBottom:30,}}>
                <Text style={{fontSize:14, fontWeight:'500',}}>Total Amount</Text>
                <Text style={{fontSize:14, fontWeight:'400',}}>N5000.00</Text>
            </View>
        </View>

                 <TouchableOpacity onPress={()=>navigation.navigate('Hire')} style={styles.hireButton}>
                            <Text style={styles.hireButtonText}>Confirm & Hire</Text>
                 </TouchableOpacity>
        </View>
    )

};

    const styles = StyleSheet.create({
        headerContainer:{
            flexDirection:'row',
            gap:124,
            alignItems:'center',
            marginBottom:20,
            marginTop:35,
            paddingLeft:10,
        },
        headerText:{
          fontSize:16,
          fontWeight:'600',
          
        },
        hireButton:{
            backgroundColor: '#1F2A47',
        padding: 10,
        borderRadius:8,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'center',
        width: 340,
        height: 50,
        marginBottom:116,
        marginTop:150,
        },
        hireButtonText:{
            color: 'white',
            fontWeight: 'bold',
        }
    })

export default HireScreen;