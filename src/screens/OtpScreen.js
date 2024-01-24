import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { faEye, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const OtpVerificationScreen = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedInput, setFocusedInput] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const expectedOtp = '1234';
  const verifyOtp = async (enteredOtp) => {
    try {
      // Add your OTP verification logic here
      // For example, you might send the entered OTP to a server for validation
  
      // Simulate a successful verification for demonstration purposes
      if (enteredOtp === '1234') {
        console.log('OTP verification successful!');
        navigation.navigate('Home');
        // Navigate to the next screen or perform any other action
      } else {
        console.log('Invalid OTP. Please try again.');
        // Handle the case where the OTP is invalid
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Handle any errors that occur during the verification process
     
    }
  };
  
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
     // Replace with the actual OTP sent to the user
     console.log('Entered OTP:', enteredOtp);
     console.log('Expected OTP:', expectedOtp);
    if (enteredOtp === expectedOtp) {
      console.log('OTP verification successful');
      // Navigate to the next screen or perform other actions
    } else {
     
    }
  };
    useEffect(() => {
    // Focus the first input when the component mounts
    inputRefs.current[0].focus();
  }, []);


  const handleResendOtp = () => {
    // TODO: Implement OTP resend logic
    console.log('Resend OTP');
    // Implement logic to resend OTP to the user
  };

  const handleInputChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
  
    setOtp(updatedOtp);
    console.log(updatedOtp)
    console.log(otp)
    setFocusedInput(value !== '' ? index : null);
    

    // Move focus to the next input when a digit is entered
    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (index === otp.length - 1 && value !== '') {
      // Trigger verification when the last digit is entered
      verifyOtp(updatedOtp.join(''));
    }
   
  };

  const handleInputFocus = (index) => {
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
      <FontAwesomeIcon icon={faChevronLeft} size={24}/>
        </TouchableOpacity>
      <Text style={styles.headerText}>Verification</Text>
      </View>
      <Text style={styles.verificationInstruction}>Please input the verification code sent to +234 8134 4356 44 <TouchableOpacity><Text style={styles.changeNumber}> Change</Text></TouchableOpacity></Text>
      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.input, digit !== '' && styles.activeInput]}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleInputChange(index, text)}
            onFocus={() => handleInputFocus(index)}
          />
        ))}
      </View>

     

      {/* Resend OTP Button */}
      <TouchableOpacity  style={styles.resendButton} onPress={handleResendOtp}>
        <Text style={styles.resendButtonText}>Didn't get code? <Text style={styles.resend}>Resend</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
},
headerContainer:{
    flexDirection:'row',
    padding:20,
    gap:64,
    alignItems:'center',
},
headerText:{
  fontSize:24,
  fontWeight:'700',
},
verificationInstruction:{
  alignSelf:'center',
  width:312,
  fontSize:15,
  textAlign:'center',
  marginTop:16,
},
changeNumber:{
  fontSize:15,
  fontWeight:'700',
  alignSelf:'center',
  textDecorationLine:'underline',
  
},
inputContainer: {
  
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
height:100,
marginBottom: 20,
marginTop:100,


},
input: {
borderWidth: 1,
width: 50,
height:50,
textAlign: 'center',
margin: 8,
marginBottom:0,
fontSize: 20,
borderColor:'#E6E6E6',
borderRadius:2,
},
button: {
backgroundColor: '#3498db',
padding: 10,
borderRadius: 5,
marginBottom: 10,
},
buttonText: {
color: '#fff',
textAlign: 'center',
fontSize: 16,
},
resendButton: {
padding: 10,
paddingTop: 0,
},
resendButtonText: {
color: '#000',
textAlign: 'center',
fontSize: 14,
},
resend:{
  fontSize:14,
  fontWeight:'700',
  alignSelf:'center',
  textDecorationLine:'underline',
  color:'#1F2A47',
}, 

activeInput: {
  borderColor: '#3E548E',
 
},
});

export default OtpVerificationScreen;
