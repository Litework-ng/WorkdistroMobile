import React from 'react';
import { View, Text, Modal, ActivityIndicator,TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, } from "react-native";
import { faChevronLeft, faDollarSign, faLocationDot ,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon,  } from '@fortawesome/react-native-fontawesome';
import {DollarSquare, Location} from 'iconsax-react-native';
import Button from '../components/Button';

const ReviewScreen =({onPrev,success,StepIndicator,loading, step, navigation, jobDetails, onSubmit})=>{
    const handleSuccessModalClose =()=>{
        setSuccess(false);
      navigation.navigate('Task');
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
      <Text style={styles.postTitle}>{jobDetails.serviceName}</Text>
      <Text style={styles.postDescription}>{jobDetails.description}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.itemDetailsContainer}>
            <Location size={16} color='#7E7E7E'/>
            <Text style={styles.locationText}>{jobDetails.location}</Text>
        </View>
        


      </View>
      <Text style={styles.budgetText}>Budget: N{jobDetails.budget}</Text>
      <Modal transparent={true} visible={loading} style={styles.modalStyles}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color='#1F2A47' />
          <Text>Loading...</Text>
        </View>
      </Modal>
      
      {/* Success Modal */}
      
      
                  <TouchableOpacity onPress={onSubmit} style={styles.postButton}>
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
        width:200
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height:100,
        width:100,
      },
      modalStyles:{
        alignItems:'center'
      }
});

export default ReviewScreen;