import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import {  faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const handleGetCode = () => {
    // Implement your logic here to handle getting the code based on the email
    console.log(`Getting code for email: ${email}`);
    navigation.navigate('ResetPwd')
    // You can navigate to the next screen or perform any other action here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>

      <View style={styles.headerContainer}>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={24}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>Forgot Password</Text>
            
        </View>
        <Image source={require('../../assets/images/Lock.png')} style={styles.lock} />
      <Text style={styles.instructions}>Enter your email to receive a verification code</Text>
      <TextInput
        style={[styles.input, isEmailFocused && styles.activeInput]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />
      <TouchableOpacity style={styles.getCodeButton} onPress={handleGetCode}>
        <Text style={styles.getCodeButtonText}>Get Code</Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerContainer:{
    flexDirection:'row',
    padding:20,
    gap:44,
    alignItems:'center',
},
headerText:{
  fontSize:24,
  fontWeight:'700',
},
lock:{
    width:192,
    height:192,
    alignSelf:'center',
    padding:20,
    resizeMode: 'contain',
    marginTop:44,
},

instructions:{
  alignSelf:'center',
  width:312,
  fontSize:16,
  fontWeight:'500',
  textAlign:'center',
  marginVertical:32,
},

input:{
  height: 50,
  width:311,
  borderColor: '#E6E6E6',
  borderWidth: 1,
  borderRadius:15,
  alignSelf:'center',
  color:'#1A1A1A',
  padding:10,
},
activeInput: {
  borderColor: '#2E3F6A', 
  borderWidth: 1, 
},
getCodeButton: {
  backgroundColor: '#1F2A47',
  padding: 10,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent:'center',
  width: 311,
  height: 50,
  marginBottom:16,
  marginTop:44,
  alignSelf:'center',
},
getCodeButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
});

export default ForgotPassword;
