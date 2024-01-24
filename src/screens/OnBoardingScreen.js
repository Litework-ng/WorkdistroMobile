// OnboardingScreen.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import OnboardingSlides from './OnBoardingSlides';

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <OnboardingSlides navigation={navigation}/>
      {/* Add your onboarding content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default OnboardingScreen;
