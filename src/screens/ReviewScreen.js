import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, } from "react-native";
import { faChevronLeft, faDollarSign, faLocationDot ,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon,  } from '@fortawesome/react-native-fontawesome';
import {DollarSquare, Location} from 'iconsax-react-native';


const ReviewScreen =({onPrev,StepIndicator, step, navigation})=>{
    const handlePost =()=>{
        console.log('Job Posted');
        navigation.navigate('Main')
        
    }
    return(
        <View  style={{backgroundColor:'#ffffff', padding:20,}}> 
           
           <View style={styles.headerContainer}>
        <TouchableOpacity  onPress={onPrev}>
      <FontAwesomeIcon icon={faChevronLeft} size={24}/>
        </TouchableOpacity>
      <Text style={styles.headerText}>Review</Text>
      </View>
      <StepIndicator step={step} />
      <Text style={styles.postText}>Your Job Post</Text>
      <Text style={styles.postInfoText}>This is a review of your job post. You can go back to edit.</Text>
      <Text style={styles.postTitle}>Laundry</Text>
      <Text style={styles.postDescription}>Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.itemDetailsContainer}>
            <Location size={16} color='#7E7E7E'/>
            <Text style={styles.locationText}>Ikorodu, Lagos</Text>
        </View>
        <View style={styles.itemDetailsContainer}> 
            <DollarSquare size={16} color='#7E7E7E'/>
            <Text style={styles.paymentText}>Wallet</Text>
        </View>


      </View>
      <Text style={styles.budgetText}>Budget: N6,000</Text>
      
                  <TouchableOpacity onPress={handlePost} style={styles.postButton}>
                    <Text style={styles.nextButtonText}>Post Job</Text>
                </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:84,
        alignItems:'center',
        marginBottom:20,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      alignSelf:'center',
      marginLeft:30,
      
    },
    postText:{
        fontSize:16,
        marginTop:25,
        fontWeight:'600',
        color:'#1A1A1A',
    },
    postInfoText:{
        marginTop:5,
        fontSize:10,
        fontWeight:'400',
        color:'#A1A1A1',
        height:14,
    },
    postTitle:{
        fontSize:14,
        fontWeight:'500',
        marginTop:20,
    },
    postDescription:{
        fontSize:12,
        fontWeight:'400',
        color:'#7E7E7E',
        width:303,
        marginTop:5,
        
    },

    detailsContainer:{
        flexDirection:'row',
        gap:32,
        marginTop:5,
        padding:0,
        
    },
    itemDetailsContainer:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
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
        fontWeight:'500'
    },
    postButton:{
    backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius:8,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    width: 355,
    height: 50,
    marginBottom:86,
    marginTop:203,
    },

    nextButtonText:{
        color: 'white',
        fontWeight: 'bold',
    }
});

export default ReviewScreen;