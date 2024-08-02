import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import DescriptionScreen from '../screens/DescriptionScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReviewScreen from '../screens/ReviewScreen';
import BottomTabNavigator from './BottomTabNavigator';
import EditableDescriptionForm from '../screens/EditableDescriptionScreen';
import EditablePaymentScreen from '../screens/EditablePaymentScreen';
import EditableReviewScreen from '../screens/EditableReviewScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '././Api'

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




const EditableForm = ({navigation, route}) => {

  const { service } = route.params;
    const [step, setStep] = useState(1); // Track the current step
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    // Define functions to handle navigation between steps
    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);
    const [jobDetails, setJobDetails] = useState({
      serviceId: service.id,
      serviceName: service.subject,
      description: service.description,
      location: service.location,
      paymentMethod: "wallet",
      budget: service.budget,
    });
    

    const handleChange = (field, value) => {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    };
    const submitJob = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("logintoken");
        if (!token) {
          console.log(token);
          throw new Error("No token found");
        }
        const response = await api.put(
          `user/job/${jobDetails.serviceId}/`,
          {
            subject: jobDetails.serviceName,
            description: jobDetails.description,
            budget: jobDetails.budget,
            location: jobDetails.location,
            service_id: jobDetails.serviceId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
  
          
        });
          
          console.log('Job posted successfully:', response.data);
          setLoading(true);
          setSuccess(true);
          navigation.navigate('Task');
        } catch (error) {
          console.error('Error posting job:', error);
          alert('Failed to post job. Please try again later.');
        }
      };
     
      
  
  
    return (
        <SafeAreaView>

      <View style={styles.container}>
        
        {/* Render components based on the current step */}
        {step === 1 && <EditableDescriptionForm  jobDetails={jobDetails} onChange={handleChange} onNext={nextStep}  StepIndicator={StepIndicator} step={step} navigation={navigation} BottomTabNavigator={BottomTabNavigator} />}
        {step === 2 && <EditablePaymentScreen  jobDetails={jobDetails} onChange={handleChange} onNext={nextStep} onPrev={prevStep} StepIndicator={StepIndicator} step={step} navigation={navigation}/>}
        {step === 3 && <EditableReviewScreen  jobDetails={jobDetails} loading={loading}  onPrev={prevStep} StepIndicator={StepIndicator} step={step}  navigation={navigation} onSubmit={submitJob}/>}
      </View>
        </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container:{
        
        
        backgroundColor:'#ffffff',
    }
  })


  export default EditableForm;