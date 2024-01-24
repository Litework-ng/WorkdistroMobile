import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faChevronLeft, faBriefcase} from '@fortawesome/free-solid-svg-icons';
import Reviews from '../components/Reviews';


const ViewProfile = ({navigation}) => {
    const [rating, setRating] = useState(0);
    const handleRating = (ratedValue) => {
        // Handle the rated value (1 to 5) as needed
        setRating(ratedValue);
      };
        return(
            <ScrollView style={{backgroundColor:'#fff',}}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24}/>
                            </TouchableOpacity>
                        <Text style={styles.headerText}>DistroWorker Profile</Text>
                    </View>
                <View  style={{flexDirection:'row', paddingLeft:20,}} >
                    <Image source={require('../../assets/images/profilepic2.png')} style={{width:50, height:50, marginRight:10,}}/>
                 <View>
                    <View style={{flexDirection:'row', gap:140,}}>
                        <Text style={{fontSize:16, fontWeight:600, marginBottom:5,}}>Tosin Alabi</Text>
                       
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <AirbnbRating
                    count={1}
                    defaultRating={0}
                    size={11}
                    onFinishRating={handleRating}
                    ratingContainerStyle={{padding:0,margin:0, alignSelf:'flex-start' }}
                    starContainerStyle={{ margin:0,padding:0, gap:-4,}}
                    showRating={false}
                        />
                    <Text style={{fontSize:14, fontWeight:400,marginBottom:2.5, }}>4.7(20 Reviews)</Text>
                    </View>
                      <View style={{flexDirection:'row', gap:32}}>
                        <View style={{flexDirection:'row', alignContent:'center', gap:5,}} >
                            <FontAwesomeIcon icon={faBriefcase} size={14} style={{marginTop:2,}} color='#000' />
                            <Text style={{fontSize:14, fontWeight:'400', color:'#000',}}>20 jobs completed</Text>
                        </View>
                       
                     </View> 
                     
                 </View>
                 
                    </View>
                    <View style={{padding:20}}>
                    <Text style={{fontSize:16, fontWeight:'600', marginTop:32,}}>About Worker</Text>
                    <Text style={{fontSize:12, fontWeight:'400', marginTop:8, color:'#3F3F3F',}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis molestie nisi vitae tincidunt. Nulla at ante mauris. Cras hendrerit placerat erat aliquet scelerisque. Sed malesuada ornare eros, vitae faucibus odio sollicitudin eu.</Text>
                    <Text style={{fontSize:16, fontWeight:'600', marginTop:32,}}>Reviews</Text>
                    <Reviews/>
                    <Reviews/>
                    <Reviews/>

                    </View>
                    <TouchableOpacity style={{alignSelf:'center', marginBottom:32,}}>
                            <Text style={{fontSize:16, fontWeight:'400', color:'#31DE9E',}}>View All...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Hire')} style={styles.hireButton}>
                            <Text style={styles.hireButtonText}>Hire</Text>
                        </TouchableOpacity>
                <View/>

            </ScrollView>
        )
};

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        gap:74,
        alignItems:'center',
        marginBottom:20,
        marginTop:35,
        paddingLeft:10,
    },
    headerText:{
      fontSize:16,
      fontWeight:'600',
      
    },
    hireButton:{
        backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius:8,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    width: 340,
    height: 50,
    marginBottom:36,
    },
    hireButtonText:{
        color: 'white',
        fontWeight: 'bold',
    }
})

export default ViewProfile