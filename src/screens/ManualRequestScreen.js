import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import UploadPhotoInput from '../components/UploadphotoInput';
import BottomTabNavigator from '../components/BottomTabNavigator';
import CustomBottomNavBar from '../components/CustomNavBar';


const ManaulRequest = ({ navigation }) => {
    const [subject, setSubject] = useState('');
    const [text, SetText] = useState('');
    const maxLength = 500;

    const handleSubjectChange = (value) => {
        setBudget(value);
      };
    return(
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
      <FontAwesomeIcon icon={faChevronLeft} size={24}/>
        </TouchableOpacity>
      <Text style={styles.headerText}>Request A Service Manually</Text>
      </View>
      <Text style={styles.subjectInputLabel}>Subject</Text>
      <TextInput
        style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20,}}
        placeholder="Park Delivery"
        value={subject}
        onChangeText={handleSubjectChange}
      />
        <View>
        <Text style={styles.descriptionInputLabel}>Description</Text>
        <TextInput
          multiline
          onChangeText={(inputText) => setText(inputText)}
          style={styles.descriptionInput}
          placeholder='Please give a full description of the task'
          value={text}
          maxLength={maxLength}
        />
        
      <Text style={styles.characters}>{`${text.length}/500`}</Text>
      </View>
      <UploadPhotoInput label='Upload photo'/>

      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.requestButton}>
        <Text style={styles.requestButtonText}>Request Service</Text>
      </TouchableOpacity>
     
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container:{
        flex:1,
        padding:20,
        backgroundColor:'#fff'
    },
    headerContainer:{
        flexDirection:'row',
        gap:34,
        alignItems:'center',
        marginBottom:20,
        marginTop:25,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },
    subjectInputLabel:{
        color:'#525252',
        marginTop:37,
        marginBottom:5,
        fontWeight:'400',
        fontSize:14,
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
          marginBottom:5,
          marginTop:5,
          paddingTop:10,
          height:213,
          width:335, 
    },

    descriptionInputLabel:{
        color:'#525252'
    },

    characters:{
        color:'#B9B9B9',
        fontSize:14,
        marginBottom:40,
    },

    requestButton:{
        backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius:8,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    width: 340,
    height: 50,
    marginBottom:36,
    },
    requestButtonText:{
        color: 'white',
        fontWeight: 'bold',
    }

})

export default ManaulRequest