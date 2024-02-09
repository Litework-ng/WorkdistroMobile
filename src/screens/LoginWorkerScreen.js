import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, } from 'react-native';
import CheckBoxForm from 'react-native-checkbox-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import {Eye, EyeSlash } from 'iconsax-react-native';




const LoginWorkerScreen = ({navigation}) => {
 
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [active, setActive] = useState(false);
  const validationSchema = yup.object().shape({
    
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  useEffect(() => {
    validateForm();
  }, []);

  const validateForm = async () => {
    try {
      await validationSchema.validate({ fullName: '', email: '', phoneNumber: '', password: '' }, { abortEarly: false });
      setErrors({ fullName: '', email: '', phoneNumber: '', password: '' });
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };


  const validateField = async (fieldName, value) => {
    try {
      await validationSchema.validate({ [fieldName]: value }, { abortEarly: false });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error.errors[0] }));
    }
  };

  const handleLogIn = async (values) => {
    console.log('presss')
    try {
      await validationSchema.validate(values, { abortEarly: false });
      navigation.navigate('BottomTabs');
      console.log('Sign up button pressed');
       
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
      console.log('Form validation failed');
    }
  };

  
   
    const [fullNameFocused, setFullNameFocused] = React.useState(false);
    const [emailFocused, setEmailFocused] = React.useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = React.useState(false);
    const [passwordFocused, setPasswordFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
   
      
    
    const handleInputFocus = (inputName) => {
      switch (inputName) {
        case 'fullName':
          setFullNameFocused(true);
          break;
        case 'email':
          setEmailFocused(true);
          break;
        case 'phoneNumber':
          setPhoneNumberFocused(true);
          break;
        case 'password':
          setPasswordFocused(true);
          break;
        default:
          break;
      }
    };
  
    const handleInputBlur = (inputName, values) => {
      switch (inputName) {
        case 'fullName':
          setFullNameFocused(false);
           validateField('fullName', values.fullname );
           console.log('checking')
          break;
        case 'email':
          setEmailFocused(false);
          break;
        case 'phoneNumber':
          setPhoneNumberFocused(false);
          break;
        case 'password':
          setPasswordFocused(false);
          break;
        default:
          break;
      }
    };

   
    
    const data = [
      {
        label: 'Remember Pasword',
        value: 'remember',
        RNchecked: termsChecked,
      },
    ];
    
    const handleTermsCheck = () => {
      setTermsChecked(!termsChecked);
    };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
    <ScrollView
    contentContainerStyle={styles.scrollContainer}
      
      >

    

    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.header}>Welcome Back, DistroWorker!</Text>
      <Formik
            initialValues={{  email: '',  password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogIn}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              isValid,
              setFieldValue
              
            }) => (
              
              <View style={styles.form}>
               

                <View style={styles.labelInputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.input, emailFocused && styles.activeInput]}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onFocus={ ()=>{handleInputFocus('email')}}
                    onBlur={() => {
                      handleInputBlur('email', values);
                      handleBlur('email');
                    }}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

              

                <View style={styles.labelInputContainer}>
                <Text style={styles.labelPassword}>Password</Text>
                  <TouchableWithoutFeedback onPress={toggleShowPassword}>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                         style={[styles.input, passwordFocused && styles.activeInput]}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onFocus={ ()=>{handleInputFocus('password')}}
                    onBlur={() => {
                      handleInputBlur('password', values);
                      handleBlur('password');
                    }}
                        
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
                      {showPassword ? <Eye size={20}  color='black'/> : <EyeSlash size={20} color='gray'/>}
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                  {touched.password && errors.password && (
                    <Text style={styles.errorTextPassword}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.userAccessContaineer}>

                            <CheckBoxForm style={styles.checkboxContainer}
                            iconSize={12}
                            iconColor='#000'
                            textStyle={{fontSize:12, color:'#1F2A47'}}
                            onChecked={handleTermsCheck}
                            itemCheckedKey='RNchecked'
                            
                    dataSource={data}
                    renderItem={(item) => (
                      <CheckBox 
                      label={item.label}
                      />

                    )}
                  />
                  <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ForgotPwd')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                

                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    !isValid  ? styles.disabledButton : null,
                  ]}
                  onPress={handleSubmit}
                  disabled={!isValid }
                >
                  <Text style={styles.signUpButtonText}>Log In</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
      <TouchableOpacity style={styles.redirectText}  onPress={() => navigation.navigate('SignUpWorker')}>
        <Text>Don't have an account? <Text style={styles.signupRedirect}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
   </ScrollView>
   </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logo: {
    width:230,
    height:48,
    marginBottom: 37,
    marginTop:20,
    justifyContent:'center',
    alignSelf:'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingLeft:0,
  },
  form: {
    width: '100%',
    alignItems:'center'
  },
  labelInputContainer: {
    marginBottom: 16,
    
  },
  label: {
    marginBottom: 8,
    marginTop:10,
    fontSize: 14,
    color:'#1A1A1A',
  },

  labelPassword: {
    paddingLeft:40,
    marginBottom: 8,
    marginTop:10,
    fontSize: 14,
    color:'#1A1A1A',
  },
  
  input:{
    height: 50,
    width:311,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    color:'#1A1A1A',
    borderRadius:4,
  },
  signUpButton: {
    backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent:'center',
    width: 311,
    height: 50,
    marginBottom:16,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  activeInput: {
    borderColor: '#2E3F6A', 
    borderWidth: 1, 
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:40,
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordButton: {
    padding: 10,
    position:'relative',
    right: 50,
    bottom:5,
  },

  errorText: {
    color: 'red',
    fontSize: 12,

    
  },
  errorTextPassword: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    paddingLeft:40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  disabledButton: {
    backgroundColor: '#818795', // Change the background color of disabled button
  },

  checkboxContainer:{
    marginBottom:42,
    marginTop:0,
    width:341,
    fontSize:12,
    
  },
  redirectText:{
    alignSelf:'center',
    fontSize:16,
    marginBottom:49,

  },
  signupRedirect:{
      color:'#1F2A47',
      fontWeight:700,
  }, 
  userAccessContaineer:{
    flexDirection:'row',
    gap: 70,
    marginBottom:80,
  }, 
  forgotPasswordText:{
    color:'#1F2A47',
    fontSize:12,
  }

});

export default LoginWorkerScreen;
