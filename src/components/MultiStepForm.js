import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import DescriptionScreen from '../screens/DescriptionScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReviewScreen from '../screens/ReviewScreen';
import BottomTabNavigator from './BottomTabNavigator';

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




const MultiStepForm = ({navigation}) => {
    const [step, setStep] = useState(1); // Track the current step
  
    // Define functions to handle navigation between steps
    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);
  
    return (
        <SafeAreaView>

      <View style={styles.container}>
        
        {/* Render components based on the current step */}
        {step === 1 && <DescriptionScreen onNext={nextStep}  StepIndicator={StepIndicator} step={step} navigation={navigation} BottomTabNavigator={BottomTabNavigator} />}
        {step === 2 && <PaymentScreen onNext={nextStep} onPrev={prevStep} StepIndicator={StepIndicator} step={step} navigation={navigation}/>}
        {step === 3 && <ReviewScreen onPrev={prevStep} StepIndicator={StepIndicator} step={step}  navigation={navigation}/>}
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