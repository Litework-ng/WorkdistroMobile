import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';


const AccountSetting = ({navigation}) =>{

    
    return(
        <View>
             <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                </TouchableOpacity>
            <Text style={styles.headerText}>Account Settings</Text>
            </View>
            <View style={{padding:20}}>
            <TouchableOpacity onPress={() => navigation.navigate('PaymentHistory')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:22,}}>
                <View style={{flexDirection:'row',  alignItems:'center', gap:15,}}>
                    <Text style={{fontSize:16, fontWeight:'500',}} >Payment History</Text>
                </View>
                 <FontAwesomeIcon icon={faChevronRight} size={24}/>
          </TouchableOpacity>
          <Text style={{marginTop:45, fontSize:10, fontWeight:'600', color:'#7B7B7B', marginBottom:14,}}>Account Control</Text>
                <TouchableOpacity>
                    <Text style={{ fontSize:14, fontWeight:'400', color:'#C11414', }}>Delete Account</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:94,
        alignItems:'center',
        marginBottom:20,
        marginTop:25,
        padding:20,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },
})

export default AccountSetting;