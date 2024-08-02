import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import CheckBox from "react-native-check-box";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { Formik } from "formik";
import { Eye, EyeSlash } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../components/Api";
import { Platform } from "react-native";
import { Checkbox } from "react-native-paper";
import CheckboxForm from "react-native-checkbox-form";
import CustomCheckbox from "../components/CustomCheckBox";
import { FirstTimeUserContext } from "../components/firstTimeUserContext";
import { UserContext } from "../components/userAuthContext";
import { AuthContext } from "../components/userAuthContext";
const LoginScreen = ({ navigation }) => {
  
 
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [active, setActive] = useState(false);
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const { login } = useContext(AuthContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { firstTimeUser, updateFirstTimeUser } = useContext(FirstTimeUserContext);
  useEffect(() => {
    validateForm();
  }, []);

  const validateForm = async () => {
    try {
      await validationSchema.validate(
        { fullName: "", email: "", phoneNumber: "", password: "" },
        { abortEarly: false }
      );
      setErrors({ fullName: "", email: "", phoneNumber: "", password: "" });
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
      await validationSchema.validate(
        { [fieldName]: value },
        { abortEarly: false }
      );
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.errors[0],
      }));
    }
  };

  const handleLogin = async (values, actions) => {
    await validationSchema.validate(values, { abortEarly: false });
    
    try {
      setIsLogging(true);
      setErrorMessage("");
      // Make API call to authenticate user
      const response = await api.post("login/", {
        email: values.email,
        password: values.password,
      });

      // Check if login was successful
      if (response.data.response) {
        const fullName = response.data.user.name
        const firstName = fullName.split(' ')[0]; 

       updateFirstTimeUser(false)
        await AsyncStorage.setItem("logintoken", response.data.access_token);
        await AsyncStorage.setItem('firstName', firstName);

        login();
        // Navigate to the next screen or perform any other action
        navigation.navigate("BottomTabs");
        console.log("Login successful");
        console.log(firstTimeUser)
      } else {
        // Handle login failure

        setErrorMessage("Invalid login credentials");
      }
    } catch (error) {
      if (error) {
        // Handle login failure
        setErrorMessage("An error occurred during login. Please try again.");
      }
      // Handle API call errors
      if (error == "AxiosError: Request failed with status code 400") {
        setErrorMessage(" Please , Provide valid login details");
      } else if (error == "AxiosError: Request failed with status code 401") {
        setErrorMessage("Sorry, You are not authorized to login");
      } else if (error == "AxiosError: Request failed with status code 405") {
        setErrorMessage("Please , Provide a valid password");
      } else if (error == "AxiosError: Request failed with status code 406") {
        setErrorMessage(
          "OTP of this account needs to be verified before login"
        );
      } else if (error == "AxiosError: Request failed with status code 409") {
        setErrorMessage("Kindly use your current password to login");
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }
    }
    setIsLogging(false);
  };

  const [fullNameFocused, setFullNameFocused] = React.useState(false);
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (inputName) => {
    switch (inputName) {
      case "fullName":
        setFullNameFocused(true);
        console.log("focused");
        break;
      case "email":
        setEmailFocused(true);
        break;
      case "phoneNumber":
        setPhoneNumberFocused(true);
        break;
      case "password":
        setPasswordFocused(true);
        break;
      default:
        break;
    }
  };
  const handleInputFocus = (inputName) => {
    switch (inputName) {
      case "email":
        setEmailFocused(true);
        break;

      case "password":
        setPasswordFocused(true);
        break;
      default:
        break;
    }
  };

  const handleInputBlur = (inputName, values) => {
    switch (inputName) {
      case "email":
        setEmailFocused(false);
        break;

      case "password":
        setPasswordFocused(false);
        break;
      default:
        break;
    }
  };

  const data = [
    {
      label: "Remember Pasword",
      value: "remember",
      RNchecked: termsChecked,
    },
  ];

  const handleTermsCheck = () => {
    setTermsChecked(!termsChecked);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.header}>Welcome Back,Distro!</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              isValid,
              setFieldValue,
            }) => (
              <View style={styles.form}>
                {errorMessage ? (
                  <Text style={{ color: "#C11414", marginBottom: 16,  fontFamily:'Manrope-Regular' }}>
                    {errorMessage}
                  </Text>
                ) : null}

                <View style={styles.labelInputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.input, emailFocused && styles.activeInput]}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onFocus={() => {
                      handleInputFocus("email");
                    }}
                    onBlur={() => {
                      handleInputBlur("email", values);
                      handleBlur("email");
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
                        style={[
                          styles.input,
                          passwordFocused && styles.activeInput,
                        ]}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onFocus={() => {
                          handleInputFocus("password");
                        }}
                        onBlur={() => {
                          handleInputBlur("password", values);
                          handleBlur("password");
                        }}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        style={styles.showPasswordButton}
                        onPress={toggleShowPassword}
                      >
                        {showPassword ? (
                          <Eye size={20} color="black" />
                        ) : (
                          <EyeSlash size={20} color="gray" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                  {touched.password && errors.password && (
                    <Text style={styles.errorTextPassword}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                <View style={styles.userAccessContaineer}>
                <CustomCheckbox
                    label="Remember Password"
                    checked={rememberPassword}
                    onChange={setRememberPassword}
                  />
                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => navigation.navigate("ForgotPwd")}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                {isLogging ? (
                  <TouchableOpacity
                    style={[
                      styles.signUpButton,
                      !isValid ? styles.disabledButton : null,
                    ]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <ActivityIndicator size="large" color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.signUpButton,
                      !isValid ? styles.disabledButton : null,
                    ]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text style={styles.signUpButtonText}>Log in</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Formik>
          <TouchableOpacity
            style={styles.redirectText}
            onPress={() => navigation.navigate("SignUpClient")}
          >
            <Text>
              Don't have an account?{" "}
              <Text style={styles.signupRedirect}>Sign Up</Text>
            </Text>
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
    width: 230,
    height: 48,
    marginBottom: 37,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    paddingLeft: 0,
    fontFamily: "Manrope-Bold",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  labelInputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    marginTop: 10,
    fontSize: 14,
    color: "#1A1A1A",
    fontFamily: "Manrope-Regular",
  },

  labelPassword: {
    paddingLeft: 40,
    marginBottom: 8,
    marginTop: 10,
    fontSize: 14,
    color: "#1A1A1A",
    fontFamily: "Manrope-Regular",
  },

  input: {
    height: 50,
    width: 311,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingLeft: 10,
    color: "#1A1A1A",
  },
  signUpButton: {
    backgroundColor: "#1F2A47",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 311,
    height: 50,
    marginBottom: 16,
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Manrope-Bold",
  },

  activeInput: {
    borderColor: "#2E3F6A",
    borderWidth: 1,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordButton: {
    padding: 10,
    position: "relative",
    right: 50,
    bottom: 5,
  },

  errorText: {
    color: "#C11414",
    fontSize: 12,
    fontFamily:'Manrope-Regular',
  },
  errorTextPassword: {
    color: "#C11414",
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 40,
    fontFamily:'Manrope-Regular'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  disabledButton: {
    backgroundColor: "#818795", // Change the background color of disabled button
  },

  checkboxContainer: {
    marginBottom: 42,
    marginTop: 0,
    width: 341,
    fontSize: 12,
  },
  redirectText: {
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 49,
  },
  signupRedirect: {
    color: "#1F2A47",
    fontWeight: "700",
    fontFamily: "Manrope-Regular",
  },
  userAccessContaineer: {
    flexDirection: "row",
    gap: 70,
    marginBottom: 80,
  },
  forgotPasswordText: {
    color: "#1F2A47",
    fontSize: 12,
    fontFamily: "Manrope-Regular",
  },
});

export default LoginScreen;
