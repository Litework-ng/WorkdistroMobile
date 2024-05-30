// OnboardingScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import OnboardingSlides from '../components/OnBoardingSlides';

const OnboardingScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
      
      <OnboardingSlides navigation={navigation}/>
      {/* Add your onboarding content here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems:'stretch',
    justifyContent:'space-between',
    backgroundColor:'#fff'
    
  },
});

export default OnboardingScreen;
