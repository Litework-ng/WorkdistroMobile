// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {SearchNormal1 } from 'iconsax-react-native';

const HomeScreen = ({ navigation }) => {

    const ServiceItem = ({ label, image, onPress }) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.serviceItem}>
            <Image source={image} style={styles.serviceItemImage} />
            <Text style={styles.serviceItemLabel}>{label}</Text>
          </View>
        </TouchableOpacity>
      );

      const handleSearchBlur = () => {
        // Dismiss the keyboard when the search input loses focus
        Keyboard.dismiss();
      };

      const handleServiceItemClick = () => {
        // Navigate to the MultiStepForm screen
        console.log('pressing click')
        navigation.navigate('MultiStepForm');
      };
      
  return (
    <TouchableWithoutFeedback onPress={handleSearchBlur}>
        
    <View style={styles.container}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />        
            <Text style={styles.welcomeText}>Hello Tee</Text>
                <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="What type of help do you need?"
                onBlur={() => {
                    handleSearchBlur()
                  }}
            />
            <SearchNormal1 size={24} color="#292D32" style={styles.searchIcon} />
            </View> 
                    <View style={styles.servicesContainer}>
                        <View style={styles.ManaulRequestcontainer}>
                            <Text style={styles.servicesTitle}>Popular Tasks</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('ManualRequest')}>
                                <Text style={styles.manaulRequestText}>Can’t Find What You Need?</Text>
                            </TouchableOpacity>

                        </View>
        {/* Render the services grid or list */}
        <ScrollView>

        <View style={styles.servicesGrid}>
            {/* Row 1 */}
            <View style={styles.servicesRow}>
            <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServiceItemClick()}
                />

            <ServiceItem
                label="service !"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                /> 
                  <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
                  <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />          
            </View>
            <View style={styles.servicesRow}>
            <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
                 <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
                  <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
                  <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
           
            </View>
            <View style={styles.servicesRow}>
            <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
                 <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
             <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
                  <ServiceItem
                label="Service 1"
                image={require('../../assets/images/services.png')}
                onPress={() => handleServicePress('Service 1')}
                />
            </View>
            
        </View>
        </ScrollView>
</View>


    </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:'white'
    },
    logo: {
        width:230,
        height:48,
        marginBottom: 37,
        marginTop:20,
        justifyContent:'center',
        alignSelf:'center'
      },
      welcomeText:{
        fontSize:18,
        fontWeight:'700',
        marginBottom:8,
        color:'#1A1A1A',
      },
      servicesTitle:{
        fontSize:16,
        fontWeight:'600',
      },
      ManaulRequestcontainer:{
        flexDirection:'row',
        alignSelf :'center',
        gap:110,
        padding:20,
        
      },
      manaulRequestText:{
        color:'#31DE9E',
        fontSize:10,
        paddingTop:5,
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        borderWidth:1,
        borderColor:'#CECECE',
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 15,
        elevation: 3,
        height:40,
        width:355,
        alignSelf:'center'
      },
      searchIcon: {
        marginRight: 0,
      },
      searchInput: {
        flex: 1,
        fontSize: 12,
        color: '#333333',
        height:40,
      },
      servicesGrid:{
        flexDirection:'row',
        gap:15,
        marginBottom:250,
      },
      serviceItemLabel:{
        alignSelf:'center',
        marginBottom:32,
      },
     
})

export default HomeScreen;
