import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import {  faChevronLeft, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Button from '../components/Button';

const WorkerBidScreen = ({navigation}) => {
    const [bid, setBid] = useState(null);
    const [text, setText] = useState('');
    const maxLength = 500;
    const handleBidChange = (value) => {
        setBid(value);
      };
      const handleInputBlur = () => {
        // Dismiss the keyboard
        Keyboard.dismiss();
      };
    return(  
        <TouchableWithoutFeedback onPress={handleInputBlur}>

        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                </TouchableOpacity>
                    <Text style={styles.headerText}>Bid</Text>
            </View>
            <Text style={styles.postTitle}>Laundry</Text>
            <Text style={styles.postDescription}>Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JobDetails')}>
                <Text style={styles.fullDetails}>View Full Job</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.bidInputLabel}>Bid</Text>
                <TextInput
                    style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20, marginLeft:20,}}
                    keyboardType="numeric"
                    placeholder="5000"
                    value={bid}
                    onChangeText={handleBidChange}
                />
            </View>
            <View>
                <Text style={styles.coverLetterInputLabel}>Cover Letter</Text>
                <TextInput
                multiline
                onChangeText={(inputText) => setText(inputText)}
                style={styles.coverLetterInput}
                placeholder=  'Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.'
                value={text}
                maxLength={maxLength}
                
                />
                
                <Text style={styles.characters}>{`${text.length}/500`}</Text>
            </View>
            <Button text='Bid' onPress={navigation.navigate('WorkerTask')}/> 
        </View>
        </TouchableWithoutFeedback>
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
    postTitle:{
        fontSize:14,
        fontWeight:'500',
        marginTop:20,
        paddingLeft:20,
    },
    postDescription:{
        fontSize:12,
        fontWeight:'400',
        color:'#7E7E7E',
        width:303,
        marginTop:5,
        paddingLeft:20,
        
    },
    fullDetails:{
        
            fontSize:10,
            fontWeight:'400',
            marginTop:10,
            marginBottom:20,
            textDecorationLine:'underline',
            color:'#31DE9E',
            paddingLeft:20,
       
    },
    coverLetterInput:{
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
          marginLeft:20,
          paddingTop:10,
          height:193,
          width:335, 
    },

    coverLetterInputLabel:{
        color:'#525252',
        marginTop:5,
        marginBottom:5,
        paddingLeft:20,
    },

    characters:{
        color:'#B9B9B9',
        fontSize:14,
        marginBottom:40,
        paddingLeft:20,
    },
    bidInputLabel:{
        color:'#525252',
        paddingLeft:20,
        marginBottom:5,
    },
});

export default WorkerBidScreen;