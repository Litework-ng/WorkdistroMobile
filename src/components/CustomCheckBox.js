import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TickSquare } from 'iconsax-react-native';


const CustomCheckbox = ({ label, checked, onChange }) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => onChange(!checked)}>
        <View style={[styles.checkbox, checked && styles.checked]}>
          {checked && <TickSquare size={20} color="black" />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius:4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 12,
    fontFamily:'Manrope-Regular',
    color:'#1F2A47'
  },
});

export default CustomCheckbox;
