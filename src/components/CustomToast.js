import { InfoCircle } from 'iconsax-react-native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');



const CustomToast = ({ visible, message, duration, onHide }) => {
  const [show, setShow] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            setShow(false);
            onHide();
          });
        }, duration || 2000);
      });
    } else {
      setShow(false);
    }
  }, [visible]);

  if (!show) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0]
          }) }] }
      ]}
    >
        <InfoCircle color='#31DE9E' size={24} variant='Bold'/>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  toastContainer: {
    flexDirection:'row',
    position: 'absolute',
    gap:15,
    top: 50,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#1F2A47',
    borderRadius: 10,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
  },
  toastText: {
    color: 'white',
    textAlign: 'center',
    fontFamily:'Manrope-SemiBold'
  },
});

export default CustomToast;
