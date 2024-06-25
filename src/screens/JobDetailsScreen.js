import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faChevronLeft, faLocationDot, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { DollarSquare, Location, ArrowLeft2 } from "iconsax-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../components/Api';
import LoadingOverlay from '../components/Loading';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';


const JobDetailsScreen = ({ route,navigation})=>{
    const { job, bid, coverLetter } = route.params;
    const [loading, setLoading] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleBidSubmit = async () => {
        if (!bid || !coverLetter) {
            Alert.alert('Error', 'Please fill in both bid and cover letter fields.');
            return;
        }

        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('logintoken');
            if (token) {
                const response = await api.post(
                    'worker/bid/', // Replace with your actual endpoint
                    { job_id: job.id, cover_letter: coverLetter, bid: bid },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSuccessVisible(true); 
            } else {
                console.error('No token found');
            }
        } catch (error) {
            if (error == "AxiosError: Request failed with status code 400") {
                setErrorMessage("Empty fields or invalid details received. Please try again!");
              } else if (error == "AxiosError: Request failed with status code 403") {
                setErrorMessage("You have already placed a bid for this Job!");
              } else{

                  setErrorMessage('There was an error placing your bid. Please try again.');
              }
          setErrorVisible(true);
      }
      finally{
          setLoading(false)
      }
        
    };

    return(
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                <ArrowLeft2 size={24} color='#1A1A1A'/>
                </TouchableOpacity>
                    <Text style={styles.headerText}>Job Details</Text>
            </View>
            <View style={styles.firstSection}>
                <Text style={styles.postTitle}>{job.subject}</Text>
                    <View  style={styles.detailsContainer}>
                        <View style={styles.itemDetailsContainer}>
                        <Location size={16} color="#7E7E7E" />
                            <Text style={styles.locationText}>{job.location}</Text>
                        </View>
                        <View style={styles.itemDetailsContainer}>
                        <DollarSquare size={16} color="#7E7E7E" />
                            <Text style={styles.paymentText}>Wallet</Text>
                        </View>
                        
                    </View>
                <Text style={styles.budgetText}>{job.budget}</Text>    
            </View>
            <View>
                <Text  style={styles.descriptionText}>Description</Text>
                <Text style={styles.descriptionContent}>{job.description}</Text>
            </View>
            <Button text='Bid' onPress={handleBidSubmit}/>
            <LoadingOverlay visible={loading} />
            <SuccessModal
                        visible={successVisible}
                        message="Your Bid Was Successful!"
                        onClose={() => setSuccessVisible(false)}
                        onConfirm={() => {
                            setSuccessVisible(false);
                            navigation.navigate('WorkerTask');  // Navigate to another screen on success
                        }}
                    />
                    <ErrorModal
                        visible={errorVisible}
                        message={errorMessage}
                        onClose={() => setErrorVisible(false)}
                    />
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
      fontFamily: 'Manrope-Bold',
      
    },
    detailsContainer:{
        flexDirection:'row',
        gap:32,
        marginTop:10,
        
        paddingLeft:20,
       
        
    },
    itemDetailsContainer:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        
    }, 

    firstSection:{
        borderBottomWidth:1,
        borderColor:'#E1E1E1',
        paddingBottom:20,
        marginBottom:20,
    },

    postTitle:{
        fontSize:14,
        fontWeight:'500',
        fontFamily: 'Manrope-SemiBold',
        marginTop:20,
        paddingLeft:20,
    },
    paymentText:{
        fontSize:12,
        fontFamily: 'Manrope-Regular',
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
        paddingLeft:5
        
    },
    locationText:{
        fontSize:12,
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
        fontFamily: 'Manrope-Regular',
        paddingLeft:5,
    }, 
    budgetText:{
        marginTop:18,
        fontSize:12,
        fontWeight:'500',
        fontFamily: 'Manrope-Medium',
        paddingLeft:20,
    },

    descriptionText:{
        marginTop:0,
        fontSize:12,
        fontWeight:'500',
        paddingLeft:20,
        fontFamily: 'Manrope-Medium',
    },
    
    descriptionContent:{
        fontSize:12,
        fontFamily: 'Manrope-Regular',
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
        padding:20,
        marginBottom:100,
    }, 
});

export default JobDetailsScreen