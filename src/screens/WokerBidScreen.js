import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, TextInput, Keyboard,KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import {  faChevronLeft, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Button from '../components/Button';
import {ArrowLeft2 } from "iconsax-react-native";
import api from '../components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../components/Loading';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';


const WorkerBidScreen = ({route,navigation}) => {
    const { job } = route.params;
    const [bid, setBid] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const maxLength = 500;
    const handleBidChange = (value) => {
        setBid(value);
      };
      const handleInputBlur = () => {
        // Dismiss the keyboard
        Keyboard.dismiss();
      };

      
    const handleBidSubmit = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('logintoken');
            if (token) {
                const response = await api.post(
                    'worker/bid/',
                    { job_id: job.id, cover_letter: text, bid: bid },
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
        <TouchableWithoutFeedback onPress={handleInputBlur}>
                  <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
        <ScrollView>
            <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <ArrowLeft2 size={24} color='#1A1A1A'/>
                </TouchableOpacity>
                    <Text style={styles.headerText}>Bid</Text>
            </View>
       
            <Text style={styles.postTitle}>{job.subject}</Text>
                <Text style={styles.postDescription}>{job.description}</Text>        
                <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job, bid, coverLetter: text })}>           
                     <Text style={styles.fullDetails}>View Full Job</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.bidInputLabel}>Bid</Text>
                <TextInput
                    style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20, marginLeft:20, fontFamily: 'Manrope-Regular',}}
                    keyboardType="numeric"
                    placeholder="5000"
                    value={bid}
                    onChangeText={handleBidChange}
                />
            </View>
            <View>
                <Text style={styles.coverLetterInputLabel}>Cover Letter</Text>
                <TextInput
                multiline
                onChangeText={(inputText) => setText(inputText)}
                style={styles.coverLetterInput}
                placeholder=  'Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.'
                value={text}
                maxLength={maxLength}
                
                />
                
                <Text style={styles.characters}>{`${text.length}/500`}</Text>
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
        </ScrollView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
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
      fontFamily: 'Manrope-SemiBold',
      
    },
    postTitle:{
        fontSize:14,
        fontWeight:'500',
        fontFamily: 'Manrope-Medium',
        marginTop:20,
        paddingLeft:20,
    },
    postDescription:{
        fontSize:12,
        fontWeight:'400',
        fontFamily: 'Manrope-Regular',
        color:'#7E7E7E',
        width:323,
        marginTop:5,
        paddingLeft:20,
        
    },
    fullDetails:{
        
            fontSize:10,
            fontWeight:'400',
            fontFamily: 'Manrope-Medium',
            marginTop:10,
            marginBottom:20,
            textDecorationLine:'underline',
            color:'#31DE9E',
            paddingLeft:20,
       
    },
    coverLetterInput:{
        fontSize: 14,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#6B6B6B',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30,
          marginBottom:5,
          marginTop:5,
          marginLeft:20,
          paddingTop:10,
          height:193,
          width:335, 
          fontFamily: 'Manrope-Regular',
    },

    coverLetterInputLabel:{
        color:'#525252',
        marginTop:5,
        marginBottom:5,
        paddingLeft:20,
        fontFamily: 'Manrope-Regular',
    },

    characters:{
        color:'#B9B9B9',
        fontSize:14,
        marginBottom:40,
        paddingLeft:20,
        fontFamily: 'Manrope-Regular',
    },
    bidInputLabel:{
        color:'#525252',
        paddingLeft:20,
        marginBottom:5,
        fontFamily: 'Manrope-Regular',
    },
});

export default WorkerBidScreen;