import React from "react"
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faChevronLeft, } from '@fortawesome/free-solid-svg-icons';

const Privacy = ({navigation}) =>{
    return(
        <ScrollView>
              <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>Privacy</Text>
             </View>
             <Text style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}> Privacy Policy:</Text>
             <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>At Workdistro, we are committed to protecting the privacy and security of our customers' personal information. This privacy policy outlines the types of personal information we collect, how we use it, and the measures we take to protect it.</Text>
            <Text  style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}>Information We Collect:</Text>
            <Text   style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>We collect personal information from our customers when they sign up for our services, including their name, email address, phone number, and billing information. We also collect information about how our customers use our services, such as their login and usage data</Text>
            <Text style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}>How We Use Your Information:</Text>
            <Text   style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>We use your personal information to provide our services to you, including processing payments and providing customer support. We may also use your information to communicate with you about our services and to provide you with marketing materials that we think may be of interest to you. We may share your information with third-party service providers who assist us in providing our services to you.</Text>
            <Text style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}>How does Workdistro handle customer complaints or issues with services provided?</Text>
            <Text   style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>We take the security of our customers' data seriously and take steps to ensure that it is protected from unauthorized access or disclosure. We use industry-standard encryption and security measures to protect your personal information, and we regularly monitor our systems for any signs of unauthorized access</Text>
            <Text style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}>Data Retention:</Text>
            <Text   style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>We will retain your personal information for as long as necessary to provide our services to you and as required by applicable law.</Text>


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

export default Privacy;