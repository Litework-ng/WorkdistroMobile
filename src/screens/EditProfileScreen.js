import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faChevronLeft, } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';

const EditProfile = ({navigation}) => {
    const [profileName, setProfileName] = useState('');
   
    const [email, setEmail] = useState('ifelere@gmail.com')
    const handleProfileNameChange = (value) => {
        setProfileName(value);
      };
     
    return(
        <ScrollView>
              <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>Edit Profile</Text>
             </View>
             <View style={{paddingHorizontal:20,paddingBottom:50,}}> 
                <View  style={{alignSelf:'center'}}>
                <Image source={require('../../assets/images/profilepic3.png')} style={{width:100, height:100}}/>
                <TouchableOpacity style={styles.editIconContainer}>
                <FontAwesomeIcon icon={faCamera} size={24} />

                </TouchableOpacity>
                </View>
                    <Text style={styles.profileInputLabel}>Profile Name</Text>
                    <TextInput
                        style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20,}}
                        
                        value={profileName}
                        onChangeText={handleProfileNameChange}
                    />
                    <View>
                        <Text style={styles.profileInputLabel}>Email Address</Text>
                        <TextInput
                        style={styles.emailInput}
                        value={email}
                                    
                        />
                    </View>
                    <Text style={styles.profileInputLabel}>Phone Number</Text>
                    <TextInput
                        style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 30, width:335, height:50, paddingHorizontal:20,}}
                        keyboardType="phone-pad"
                        value={profileName}
                        onChangeText={handleProfileNameChange}
                    />
                <Button text='Save Changes'/>
             </View>
        </ScrollView>
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
      
    },
    editIconContainer:{
        backgroundColor:'white',
         width:32, 
         height:32,
         borderRadius:50,
         position:'relative',
         left:70,
         bottom:30,
         justifyContent:'center',
         alignItems:'center'
    },
    profileInputLabel:{
        color:'#525252',
        marginTop:27,
        marginBottom:5,
        fontWeight:'400',
        fontSize:14,
    },

    
    emailInput:{
        width:335,
        height:50,
        backgroundColor:'#E5E5E5',
        borderRadius:4,
        paddingLeft:16,
        marginTop:5,
        marginBottom:20,
    },
});
export default EditProfile;