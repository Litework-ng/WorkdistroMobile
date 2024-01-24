import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';

const ConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer} >
        <View style={styles.modalHeader}>
        <Image source={require('../../assets/images/modalicon.png')} style={styles.modalIcon} />
        <TouchableOpacity onPress={onCancel}>
        <FontAwesomeIcon icon={faClose}/>

        </TouchableOpacity>
        </View>
        <Text style={styles.modalText}>You Are About To Cancel This Task </Text>
        <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={onCancel} style={{backgroundColor:'#C11414', padding:12, borderRadius:8,}}>
          <Text style={{color:'#fff', fontSize:16, fontWeight:'500',}}>Cancel Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm}  style={{backgroundColor:'#fff', padding:12, borderRadius:8, borderWidth:1, paddingHorizontal:39,}}>
          <Text style= {{color:'#000', fontSize:16, fontWeight:'500',}}>Go Back</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer:{
        width:335,
        backgroundColor:'#fff',
        padding:20,
         borderRadius:4,
    },

    modalHeader:{
        alignSelf:'center',
        flexDirection:'row',
        
    },
    modalIcon:{
        marginRight:105,
        marginLeft:100,
    }, 
    modalText:{
        fontSize:14,
        fontWeight:'400',
        marginTop:20,
        alignSelf:'center',
    },
    buttonContainer:{
      flexDirection:'row',
      alignSelf:'center', 
      marginTop:33,
      marginBottom:10,
      gap:30, 
    },
})

export default ConfirmationModal;
