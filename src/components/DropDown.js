import React from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropdownInput = ({ label, items, onValueChange }) => {

    const styles = {
        inputIOS: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#6B6B6B',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30,
          marginBottom:20,
        },
        inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderWidth: 0.5,
          borderColor: '#6B6B6B',
          borderRadius: 8,
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

export default DropdownInput;
