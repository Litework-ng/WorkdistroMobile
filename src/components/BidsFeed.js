import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch , faEdit, faLocationDot, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import { DollarSquare, Location } from 'iconsax-react-native';


const BidsFeed = ({job, bid}) => {
    return(
        <View style={{borderWidth:1,padding:15, borderRadius:4, marginTop:20, borderColor:'#E4E4E4',}}>
            <View style={{flexDirection:'row',  }}>
                
                <View style={{flexDirection:'row', gap:10,}}>
                    <Text style={styles.taskTitle}>{job.subject}</Text>
                    
                </View>
                <TouchableOpacity>

                    <Text style={{fontSize:10, fontWeight:'400',fontFamily:'Manrope-Regular', color:'#C11414', alignSelf:'center', marginLeft:165,}}>Withdraw Bid</Text>
                </TouchableOpacity>

            </View>
            <Text style={{fontSize:12, color:'#7E7E7E', width:303, height:36, marginTop:10, fontFamily:'Manrope-Regular'}}>{job.description}</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.itemDetailsContainer}>
                <Location size={16} color='#7E7E7E'/>
                <Text style={styles.locationText}>{job.location}</Text>
            </View>
           
            </View>
            <View style={{flexDirection:'row', gap:50,}}>
            <Text style={styles.budgetText}>Budget: N{job.budget}</Text>
            <Text style={styles.budgetText}>Bid: N{bid.bid}</Text>

            </View>
            
            
        </View>
    )
};

const styles = StyleSheet.create({
    taskTitle:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Manrope-Medium'
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
        fontFamily:'Manrope-Regular'
    },
    locationText:{
        fontSize:12,
        color:'#7E7E7E',
        alignSelf:'center',
        fontWeight:'400',
        fontFamily:'Manrope-Regular'
    }, 
    budgetText:{
        marginTop:18,
        fontSize:12,
        fontWeight:'500',
        fontFamily:'Manrope-Medium'
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
    }
})

export default BidsFeed;