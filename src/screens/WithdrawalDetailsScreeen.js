import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,  TextInput } from 'react-native';
import {  faChevronLeft, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DropdownInput from '../components/DropDown';
import Button from '../components/Button';
import CheckBoxForm from 'react-native-checkbox-form';



const WithdrawalDetails = () => {
    const [amount, setAmount] = useState('');
    const [account, setAccount] =useState('')
    const handleAmountChange = (value) => {
        setAmount(value);
      };
      const handleAccountChange = (value) => {
        setAccount(value);
      };
      const handleDropdownChange = (value) => {
        setSelectedValue(value);
      };
      const dropdownItems = [
        { label: ' FIRST BANK OF NIGERIA', value: 'first bank account' },
        { label: ' ACCESS BANK ', value: 'access bank account' },       
        { label: ' UNITED BANK OF AFRICA', value: 'UBA bank account' },
      ];

      const [selectedValue, setSelectedValue] = useState(null);
      const [termsChecked, setTermsChecked] = useState(false);


      const data = [
        {
          label: 'Save For Future Withdrawals',
          value: 'terms',
          RNchecked: termsChecked,
        },
      ];
      
      const handleTermsCheck = () => {
        setTermsChecked(!termsChecked);
      };
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
                    <Text style={{fontSize:14, fontWeight:'400', marginTop:10,}}>Destination</Text>
                        <Text style={styles.accountInputLabel}>Account Number</Text>
                            <TextInput
                                style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20,}}
                                keyboardType="numeric"
                               
                                value={account}
                                onChangeText={handleAccountChange}
                            />

                      </View>
                      <View style={{paddingHorizontal:20,   height:60,}}> 
                        <Text style={styles.dropDownLabel}>Bank Name</Text>
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
                    <CheckBoxForm style={styles.checkboxContainer}
                            iconSize={24}
                            iconColor='#797979'
                            textStyle={{fontSize:12,}}
                            onChecked={handleTermsCheck}
                            itemCheckedKey='RNchecked'
                            
                    dataSource={data}
                    renderItem={(item) => (
                      <CheckBox
                        label={item.label}
                      />

                    )}
                  />
                  <Button text='Withdraw'/>


        </View>
    );
};

const styles = StyleSheet.create({
        dropDownLabel:{
            fontSize:12,
            fontWeight:'400',
            color:'#BABABA',
            
        },
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

        accountInputLabel:{
            fontSize:12,
            fontWeight:'400',
            color:'#BABABA',
            marginTop:5,
        },

        dropdownIcon: {
            padding: 10,
            position:'relative',
            left: 285,
            bottom:60,
          },
          
        checkboxContainer:{
            marginBottom:42,
            marginTop:0,
            width:241,
            fontSize:12,
            
            alignSelf:'flex-start',
           
            
        },
    
});

export default WithdrawalDetails