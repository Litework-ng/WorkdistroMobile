import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faChevronLeft, faLocationDot, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';


const JobDetailsScreen = ()=>{
    return(
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                </TouchableOpacity>
                    <Text style={styles.headerText}>Job Details</Text>
            </View>
            <View style={styles.firstSection}>
                <Text style={styles.postTitle}>Laundry</Text>
                    <View  style={styles.detailsContainer}>
                        <View style={styles.itemDetailsContainer}>
                            <FontAwesomeIcon icon={faLocationDot} size={16} color='#7E7E7E'/>
                            <Text style={styles.locationText}>Ikorodu, Lagos</Text>
                        </View>
                        <View style={styles.itemDetailsContainer}>
                            <FontAwesomeIcon icon={faDollarSign}size={16} color='#7E7E7E'/>
                            <Text style={styles.paymentText}>Wallet</Text>
                        </View>
                        
                    </View>
                <Text style={styles.budgetText}>Budget: N6,000</Text>    
            </View>
            <View>
                <Text  style={styles.descriptionText}>Description</Text>
                <Text style={styles.descriptionContent}>Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.</Text>
            </View>
            <Button text='Bid'/>
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
    detailsContainer:{
        flexDirection:'row',
        gap:32,
        marginTop:5,
        
        paddingLeft:20,
       
        
    },
    itemDetailsContainer:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        
    }, 

    firstSection:{
        borderBottomWidth:1,
        borderColor:'#7E7E7E',
        paddingBottom:20,
        marginBottom:20,
    },

    postTitle:{
        fontSize:14,
        fontWeight:'500',
        marginTop:20,
        paddingLeft:20,
    },
    paymentText:{
        fontSize:12,
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
        
    },
    locationText:{
        fontSize:12,
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
    }, 
    budgetText:{
        marginTop:18,
        fontSize:12,
        fontWeight:'500',
        paddingLeft:20,
    },

    descriptionText:{
        marginTop:0,
        fontSize:12,
        fontWeight:'500',
        paddingLeft:20,
    },
    
    descriptionContent:{
        fontSize:12,
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
        padding:20,
        marginBottom:100,
    }, 
});

export default JobDetailsScreen