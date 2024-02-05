import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CheckBoxForm from 'react-native-checkbox-form';
import { RadioButton } from 'react-native-paper';
import CustomRadioButton from '../components/CustomRadioButton';





  
const EditablePaymentScreen =({ onNext, StepIndicator, step, navigation, onPrev })=>{

    const [budget, setBudget] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('wallet');
    const [location, setLocation] = React.useState('');
    const [useCurrentLocation, setUseCurrentLocation] = React.useState(false);
   

    const handleBudgetChange = (value) => {
      setBudget(value);
    };
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
      };
    
      const handleLocationChange = (value) => {
        setLocation(value);
      };
    
      const toggleCurrentLocation = () => {
        setUseCurrentLocation(!useCurrentLocation);
      };
      const data = [
        {
          label: 'Use current location',
          value: 'remember',
          RNchecked: useCurrentLocation,
        },
      ];
      
      const handleTermsCheck = () => {
        setUseCurrentLocation(!useCurrentLocation);
      };
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView>

        
             <View style={styles.headerContainer}>
        <TouchableOpacity  onPress={onPrev}>
      <FontAwesomeIcon icon={faChevronLeft} size={24}/>
        </TouchableOpacity>
      <Text style={styles.headerText}>Payment</Text>
      </View>
      <StepIndicator step={step} />
      
      <Text style={styles.budgetInputLabel}>Budget</Text>
      <TextInput
        style={{  borderColor: 'gray', borderWidth: 1,borderRadius:4, borderColor:'#6B6B6B', marginBottom: 20, width:335, height:50, paddingHorizontal:20,}}
        keyboardType="numeric"
        placeholder="5000"
        value={budget}
        onChangeText={handleBudgetChange}
        editable={true}
      />
       <Text style={{marginTop:32, marginBottom:6.5,}}>Payment Method</Text>
       <View style={{flexDirection:'row', gap:64,}}>

       <CustomRadioButton
        label="Wallet"
        checked={paymentMethod === 'wallet'}
        onPress={() => handlePaymentMethodChange('wallet')}
      />
      <CustomRadioButton
        label="Cash"
        checked={paymentMethod === 'cash'}
        onPress={() => handlePaymentMethodChange('cash')}
      />
       </View>
       <View style={{marginTop:34,}}>

       <Text>Location</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 5, borderRadius:4, paddingHorizontal:20, marginTop:5, height:50, }}
        placeholder="12, Lagos Street, Lagos, Nigeria"
        value={location}
        onChangeText={handleLocationChange}
        editable={true}
      />
       </View>
       <CheckBoxForm style={styles.checkboxContainer}
                            iconSize={24}
                            iconColor='#000'
                            textStyle={{fontSize:12, color:'#1F2A47'}}
                            onChecked={handleTermsCheck}
                            itemCheckedKey='RNchecked'
                            
                    dataSource={data}
                    renderItem={(item) => (
                      <CheckBox 
                      label={item.label}
                      />

                    )}
                  />
                  <TouchableOpacity onPress={onNext} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Review Post</Text>
                </TouchableOpacity>
                </ScrollView>
        </KeyboardAvoidingView>
        
    )
};
const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:84,
        alignItems:'center',
        marginBottom:20,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },
    budgetInputLabel:{
        color:'#525252',
        marginTop:37,
        marginBottom:5,
    },
    checkboxContainer:{
        
        alignSelf:'flex-start',
        width:150,
        padding:10,
        
    },
    nextButton:{
        backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius:8,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    width: 355,
    height: 50,
    marginBottom:16,
    marginTop:109,
    },
    nextButtonText:{
        color: 'white',
        fontWeight: 'bold',
    }
})

export default EditablePaymentScreen;