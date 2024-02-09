import React from "react"
import { ScrollView, StyleSheet, View, Text, TouchableOpacity,  } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faChevronLeft, } from '@fortawesome/free-solid-svg-icons';

const AboutUs = ({navigation}) =>{
    return(
        <ScrollView>
              <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>About Us</Text>
             </View>
             <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>At Workdistro, we understand that life can be busy and hectic, and that finding reliable and affordable home services, errands, artisans, and tech-related services can be a challenge. That's why we've made it our mission to simplify your life by offering a wide range of services to help you with all your needs.</Text>
             <Text   style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>Our team consists of highly trained and experienced professionals who are passionate about providing top-quality services to our clients. From cleaning and lawn care to handyman services and tech support, we've got you covered.</Text>
            <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>At Workdistro, we believe in delivering exceptional service with a personal touch. We take the time to understand your needs and preferences, and we work closely with you to develop a customized solution that meets your unique requirements.</Text>
            <Text   style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>We are committed to using the latest technology and tools to deliver fast, reliable, and efficient services to our clients. We also take great pride in our commitment to sustainability, and we strive to minimize our environmental impact by using eco-friendly products and practices whenever possible.</Text>
            <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>At Workdistro, we believe that everyone deserves access to high-quality services at an affordable price. That's why we offer competitive rates and flexible payment options to ensure that our services are accessible to everyone.</Text>
            <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, marginBottom:30, paddingLeft:20, textAlign:'left'}}>If you're looking for reliable, affordable, and top-quality home services, errands, artisans, or tech-related services, look no further than Workdistro. Contact us today to learn more about how we can help simplify your life and meet all your service needs.</Text>

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:124,
        alignItems:'center',
        marginBottom:20,
        marginTop:35,
        paddingLeft:10,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },
})

export default AboutUs;