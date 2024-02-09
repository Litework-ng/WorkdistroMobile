import React from "react"
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faChevronLeft, } from '@fortawesome/free-solid-svg-icons';

const Faq = ({navigation}) =>{
    return(
        <ScrollView>
              <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>FAQs</Text>
             </View>
             <Text style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}> What types of services does Workdistro offer?</Text>
             <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>Workdistro offers a wide range of services including home services such as cleaning, lawn care, handyman services, and tech-related services such as computer repair and troubleshooting. They also offer errands services such as grocery shopping, pet care, and transportation services, as well as artisan services like painting, plumbing, and electrical work.</Text>
            <Text  style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}>How does Workdistro ensure the quality of its services?</Text>
            <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>Workdistro ensures the quality of its services by carefully selecting and vetting its service providers. They conduct background checks, reference checks, and require proof of insurance and licensing where applicable. They also monitor service providers' performance and regularly solicit feedback from customers to ensure the quality of the services provided.</Text>
            <Text  style={{fontSize:14, fontWeight:'500', color:'#000',  paddingLeft:20, marginTop:20,}}>How does Workdistro select its service providers?</Text>
            <Text  style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, paddingLeft:20, textAlign:'left'}}>Workdistro selects its service providers based on a rigorous vetting process that includes background checks, reference checks, and verification of insurance and licensing where applicable. They also look for service providers who have a track record of providing high-quality services and who are reliable and professional.</Text>
            <Text  style={{fontSize:14, fontWeight:'500', color:'#000',   paddingHorizontal:20, marginTop:20,}}>How does Workdistro handle customer complaints or issues with services provided?</Text>
            <Text style={{fontSize:12, color:'#7E7E7E', width:363, height:106, marginTop:5, marginBottom:30, paddingLeft:20, textAlign:'left'}}>Workdistro takes customer complaints and issues with services provided very seriously. They have a dedicated customer support team that is available to address any concerns or issues that arise. They also work closely with their service providers to resolve any issues and ensure that the customer is satisfied with the outcome.</Text>

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

export default Faq;