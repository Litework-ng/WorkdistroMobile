import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import DescriptionScreen from '../screens/DescriptionScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReviewScreen from '../screens/ReviewScreen';
import BottomTabNavigator from './BottomTabNavigator';
import api from '../components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StepIndicator = ({ step }) => {
    // Customize the appearance of the step indicator as needed
    const indicatorStyles = {
      width: 105,
      height: 2,
      borderRadius: 15,
      backgroundColor: '#31DE9E',
      justifyContent: 'center',
      alignItems: 'center',
    
    };
  
    return (
      <View style={{ flexDirection: 'row', marginBottom: 20,  gap:10, alignSelf:'center' }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View
            key={index}
            style={[
              indicatorStyles,
              { backgroundColor: index + 1 === step ? '#31DE9E' : '#DFEEE9' },
            ]}
          >
            <Text style={{ color: 'white' }}>{index + 1}</Text>
          </View>
        ))}
      </View>
    );
  };




const MultiStepForm = ({navigation, route}) => {
  const { service } = route.params;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1); // Track the current step
    const [jobDetails, setJobDetails] = useState({
      serviceId: service.id,
      serviceName: service.name,
      description: '',
      location: '',
      paymentMethod: '',
      budget: '',
    });
    const handleChange = (field, value) => {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    };
  

    // Define functions to handle navigation between steps
    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);
    const submitJob = async () => {
      setLoading(true);
      try {
        
        const token = await AsyncStorage.getItem("logintoken");
        if (!token) {
          console.log(token)
          throw new Error('No token found');
        }
        const response = await api.post('user/job/', {
          subject: jobDetails.serviceName,
          description: jobDetails.description,
          budget: jobDetails.budget,
          location: jobDetails.location,
          service_id: jobDetails.serviceId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        
      });
        
        console.log('Job posted successfully:', response.data);
        setLoading(true);
        setSuccess(true);
        navigation.navigate('Task');
      } catch (error) {
        console.log(jobDetails.serviceName)
        console.log(jobDetails.serviceId)
        console.log(jobDetails.budget)
        console.log(jobDetails.location)
        console.log(jobDetails.description)
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again later.');
      }
    };
   
    return (
        <SafeAreaView>

      <View style={styles.container}>
        
        {/* Render components based on the current step */}
        {step === 1 && <DescriptionScreen onNext={nextStep}  StepIndicator={StepIndicator} step={step} navigation={navigation} BottomTabNavigator={BottomTabNavigator}  jobDetails={jobDetails} onChange={handleChange} />}
        {step === 2 && <PaymentScreen onNext={nextStep} onPrev={prevStep} StepIndicator={StepIndicator} step={step} navigation={navigation}  jobDetails={jobDetails} onChange={handleChange}/>}
        {step === 3 && <ReviewScreen onPrev={prevStep} StepIndicator={StepIndicator} step={step}  navigation={navigation}  jobDetails={jobDetails} onSubmit={submitJob} loading={loading} success={success}/>}
      </View>
        </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container:{
        
        padding:0,
        backgroundColor:'#ffffff',
    }
  })


  export default MultiStepForm;