import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,  TextInput } from 'react-native';
import {  faChevronLeft, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DropdownInput from '../components/DropDown';
import Button from '../components/Button';

const WithdrawalSaved = ({navigation})=>{
    const [amount, setAmount] = useState('');
    const handleAmountChange = (value) => {
        setAmount(value);
      };
      const handleDropdownChange = (value) => {
        setSelectedValue(value);
      };
      const dropdownItems = [
        { label: '******9875 FIRST BANK OF NIGERIA', value: 'first bank account' },
        { label: '******9875 FIRST BANK OF NIGERIA', value: 'first bank account' },       
        { label: '******9875 FIRST BANK OF NIGERIA', value: 'first bank account' },
      ];

      const [selectedValue, setSelectedValue] = useState(null);
    return(
        <View>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>Withdrawal</Text>
                    </View>
                    <View style={{paddingHorizontal:20,}}>

                    <Text style={styles.amountInputLabel}>Amount to Withdraw</Text>
                        <TextInput
                            style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20,}}
                            keyboardType="numeric"
                            placeholder="5000"
                            value={amount}
                            onChangeText={handleAmountChange}
                        />
                       
                    
                    </View>
                    <View style={{paddingHorizontal:20,}}> 
                        <Text style={styles.dropDownLabel}>Destination</Text>
                    <DropdownInput
                        
                        items={dropdownItems}
                        onValueChange={handleDropdownChange}
                        
                    />
                      <TouchableOpacity style={styles.dropdownIcon} >
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        size={20}
                        color="gray"
                      />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.newAccount}  onPress={() => navigation.navigate('WithdrawalDetails')}>
                        <Text>Enter New Account</Text>
                    </TouchableOpacity>
                    <Button text='Withdraw'/>


        </View>
    );

};

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:104,
        alignItems:'center',
        marginBottom:20,
        marginTop:35,
        paddingLeft:10,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },

    amountInputLabel:{
        fontSize:14,
        fontWeight:'400',
        color:'#525252',
        marginBottom:4,
    },

    newAccount:{
        marginTop:16,
        marginBottom:35,
        paddingVertical:6,
        paddingHorizontal:18,
        alignSelf:'center',
        borderWidth:1,
        borderColor:'#1F2A47',
        borderRadius:8,
    },

    newAccountText:{
        fontSize:14,
        fontWeight:'400'
    },

    dropdownIcon: {
        padding: 10,
        position:'relative',
        left: 285,
        bottom:60,
      },
})

export default WithdrawalSaved