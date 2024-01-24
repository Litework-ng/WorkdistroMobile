import React from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const MonthDropdown = ({ label, items, onValueChange }) => {

    const styles = {
        inputIOS: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          color: 'black',
          paddingRight: 30,
          marginBottom:20,
         
          
        },
        inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 8,
          color: 'black',
          paddingRight: 30,
          marginBottom:20,
        },
      };
  return (
    <View>

      <RNPickerSelect
        items={items}
        onValueChange={onValueChange}
        style={styles}
        placeholder={{}}
      />
       
      
    </View>
  );
};

export default MonthDropdown;
