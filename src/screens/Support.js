import React, {useState} from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faChevronLeft, } from '@fortawesome/free-solid-svg-icons';

import Button from "../components/Button";


const Support = ({navigation}) => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [text, setText] = useState('');


    const handleNameChange = (value) => {
        setName(value);
      };

      const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
      };

      const maxLength = 500;
    return(
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        
        <View>
            <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>Support</Text>
             </View>
             <Text style={styles.profileInputLabel}>Name</Text>
                    <TextInput
                        style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20,}}
                        editable={true}
                        value={name}
                        onChangeText={handleNameChange}
                    />

            <Text style={styles.profileInputLabel}>Phone Number</Text>
                    <TextInput
                        style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 30, width:335, height:50, paddingHorizontal:20,}}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        editable={false}
                        onChangeText={handlePhoneNumberChange}
                    />

            <Text style={styles.descriptionInputLabel}>Message</Text>
                    <TextInput
                    multiline
                    onChangeText={(inputText) => setText(inputText)}
                    style={styles.descriptionInput}
                    placeholder='Leave A Message'
                    value={text}
                    maxLength={maxLength}
                    />


            <Button text='Submit'/>
        </View>
    </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },

    profileInputLabel:{
        color:'#525252',
        marginTop:27,
        marginBottom:5,
        fontWeight:'400',
        fontSize:14,
    },

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
      
    },

    descriptionInput:{
        fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#6B6B6B',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30,
          marginBottom:35,
          marginTop:5,
          paddingTop:10,
          height:213,
          width:335, 
    },

    descriptionInputLabel:{
        color:'#525252'
    },
})

export default Support;