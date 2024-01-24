import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const VerifyWithdrawal = ({navigation}) =>{

    const [password, setPassword] = useState('')
    return(
        <View>
            <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>Withdrawal</Text>

                    </View>
                <Text style={{fontSize:16, fontWeight:'600', alignSelf:'center', marginTop:111,}}>Hi</Text>
                <Text  style={{fontSize:16, fontWeight:'600', alignSelf:'center', }}>to***********@gmail.com</Text>

                <View>
                    <Text  style={{fontSize:10, fontWeight:'400', alignSelf:'center', marginTop:32, color:'#5F5F5F'}}>Please re-enter your password</Text>
                    
                  
                    
                      <TextInput
                         style={styles.input}
                        value={password}
                        onChangeText={(password) => setPassword(password)} 
                        secureTextEntry={true}
                      />
                </View>
                <Button text='Withdraw' onPress={() => navigation.navigate('WithdrawalSaved')}/>
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

    input:{
        width:335,
        height:39,
        borderColor:'#656565',
        borderWidth:1,
        borderRadius:4,
        alignSelf:'center',
        marginTop:5,
        marginBottom:32,
        paddingHorizontal:20,
    }
})

export default VerifyWithdrawal