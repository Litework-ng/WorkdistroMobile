import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {  faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Eye, EyeSlash, ArrowLeft2 } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../components/Api'

const validationSchema = yup.object().shape({
  code: yup.string().required('Verification code is required'),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ResetPassword = ({navigation}) => {
const [forgetting, setForgetting]= useState() 
  const handleResetPassword = async (values) => {
    console.log(values.code)
    console.log(values.password)
    try {
   const token = await AsyncStorage.getItem('forgotToken');
      resetting(true)
      // Make a request to the forgot password API endpoint
      const response = await api.put('/user/forgotten-password/', {
        otp: values.code,
        password: values.newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in request headers
        }
      
      });
      // Handle successful response
      Alert.alert('Password Reset Email Sent', 'An OTP code has been sent to your email address.');
      navigation.navigate('Login')
     
    } catch (error) {
      // Handle error response
      Alert.alert('Error', 'Failed to send password reset email. Please try again later.');
      console.error('Login Error:', error);
    }
    setResetting(false)
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =useState('')
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
  const [resetting, setResetting] = useState(false)
  

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
            <Text style={styles.headerText}>Reset Password</Text>
            
        </View>
        <Image source={require('../../assets/images/Lock.png')} style={styles.lock} />
        <Text style={styles.instructions}>Please enter the code sent to johny123@gmail.com <TouchableOpacity><Text style={styles.changeEmail}> Change</Text></TouchableOpacity></Text>
      <Formik
        initialValues={{ code: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View style={styles.form}>
            <View style={styles.labelInputContainer}>
                  <Text style={styles.label}>Code</Text>
            <TextInput
              style={[styles.input, touched.code && errors.code && styles.errorInput, isCodeFocused && styles.activeInput]}
              keyboardType="numeric"
              value={values.code}
              onChangeText={handleChange('code')}
              onFocus={() => setIsCodeFocused(true)}
              onBlur={() => setIsCodeFocused(false)}
            />
            {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
            </View>
            <View style={styles.labelInputContainer}>
                  <Text style={styles.label}>New Password</Text>
            <TextInput
              style={[styles.input, touched.newPassword && errors.newPassword && styles.errorInput,  isNewPasswordFocused && styles.activeInput]}
              secureTextEntry={!showPassword}
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onFocus={() => setIsNewPasswordFocused(true)}
              onBlur={() => setIsNewPasswordFocused(false)}
            />
             <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
             {showPassword ? <Eye color='gray' size={20}/> : <EyeSlash color='gray' size={20}/>}
               </TouchableOpacity>
            {touched.newPassword && errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
            </View>
            <View style={styles.labelInputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[styles.input, touched.confirmPassword && errors.confirmPassword && styles.errorInput,  isConfirmPasswordFocused && styles.activeInput]}
              secureTextEntry={!showConfirmPassword}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() =>  setIsConfirmPasswordFocused(false)}
            />
             <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowConfirmPassword}>
                      
                        {showPassword ? <Eye color='gray' size={20}/> : <EyeSlash color='gray' size={20}/>}
                       
                      </TouchableOpacity>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            </View>
            
            {resetting ? (
                  <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    !isValid || !termsChecked ? styles.disabledButton : null,
                  ]}
                  onPress={handleSubmit}
                  disabled={!isValid || !termsChecked}
                >
                      <ActivityIndicator size="large" color="#fff" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.signUpButton,
                          !isValid || !termsChecked ? styles.disabledButton : null,
                        ]}
                        onPress={handleSubmit}
                        disabled={!isValid || !termsChecked}
                      >
                        <Text style={styles.signUpButtonText}>Reset Password</Text>
                      </TouchableOpacity>
                    )}
          </View>
        )}
      </Formik>
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
    width:65,
    height:85,
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
  changeEmail:{
    fontSize:15,
    fontWeight:'700',
    alignSelf:'center',
    textDecorationLine:'underline',
    
  },
  labelInputContainer: {
    marginBottom: 16,
    alignSelf:'center',
    
    
  },
  label: {
    marginBottom: 8,
    marginTop:10,
    fontSize: 14,
    color:'#1A1A1A',
  },
  showPasswordButton: {
    
    position:'relative',
    left: 260,
    bottom:35,
  },

  
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop:10,
    
  },
  resetButton: {
    backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent:'center',
    width: 311,
    height: 50,
    marginBottom:16,
    marginTop:64,
    alignSelf:'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPassword;
