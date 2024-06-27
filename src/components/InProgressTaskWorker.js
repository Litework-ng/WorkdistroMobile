import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch , faEdit, faLocationDot, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import { DollarSquare, Location } from 'iconsax-react-native';

const InProgressTaskWorker = ({navigation, job, bid}) => {
    const [rating, setRating] = useState(0);
    const handleRating = (ratedValue) => {
        // Handle the rated value (1 to 5) as needed
        setRating(ratedValue);
      };

    return(
        <View style={{borderWidth:1,padding:15, borderRadius:4, marginTop:20, borderColor:'#E4E4E4',}}>
        <View style={{flexDirection:'row',  }}>
            
            <View style={{flexDirection:'row', gap:10,}}>
                <Text style={styles.taskTitle}>{job.subject}</Text>
                
            </View>
           

        </View>
        <Text style={{fontSize:12, color:'#7E7E7E', width:303, height:36, marginTop:10,}}>{job.description}</Text>
        <View style={styles.detailsContainer}>
            <View style={styles.itemDetailsContainer}>
            <Location size={16} color='#7E7E7E'/>
            <Text style={styles.locationText}>{job.location}</Text>
        </View>
        <View style={styles.itemDetailsContainer}> 
            <DollarSquare size={16} color='#7E7E7E'/>
            <Text style={styles.paymentText}>Wallet</Text>
        </View>
        </View>
        <View style={{flexDirection:'row', gap:50,}}>
             <Text style={styles.budgetText}>Budget: N{job.budget}</Text>
             <Text style={styles.budgetText}>Bid: N{bid.bid}</Text>
        </View>
        
        <Text style={{fontSize:12,fontWeight:'500', color:'#818181', marginTop:16, marginBottom:5,}}>Distroworker:</Text>
        <View style={{flexDirection:'row', gap:5}}>
            <Image source={require('../../assets/images/profilepic.png')} style={styles.profilepic} />
            <View >
                <Text style={{fontSize:12, fontWeight:'400'}}>Tosin Alabi</Text>
                <AirbnbRating
                    count={5}
                    reviews={[ ]}
                    defaultRating={0}
                    size={10}
                    onFinishRating={handleRating}
                    ratingContainerStyle={{padding:0,margin:0, }}
                    starContainerStyle={{ margin:0,padding:0, gap:-4,}}
                    showRating={false}
                />
            </View>
        </View>
        <TouchableOpacity  style={styles.ViewBidButton} onPress={()=>navigation.navigate('UpdatedTask')}>
                <Text style={styles.ViewBidText}>Update Task</Text>
            </TouchableOpacity>
    </View>
    )
};

const styles = StyleSheet.create({
    taskTitle:{
        fontSize:14,
        fontWeight:'500',
    },
    detailsContainer:{
        flexDirection:'row',
        gap:32,
        marginTop:5,
        padding:0,
        
    },
    itemDetailsContainer:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        gap:2,
    }, 
    paymentText:{
        fontSize:12,
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
    },
    locationText:{
        fontSize:12,
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
    }, 
    budgetText:{
        marginTop:18,
        fontSize:12,
        fontWeight:'500'
    },
    ViewBidButton:{
    backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius:8,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    width: 169,
    
    marginBottom:6,
    marginTop:40,
    },

    ViewBidText:{
        color: 'white',
        fontWeight: '700',
        fontSize:16,
    },

    profilepic:{
        width:20,
        height:20,
    },
})

export default InProgressTaskWorker;