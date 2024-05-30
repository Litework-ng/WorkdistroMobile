import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch , faEdit, faLocationDot, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import {Location, DollarSquare} from 'iconsax-react-native';


const InProgressTask = ({navigation, imageSource, }) => {
    const [rating, setRating] = useState(0);
    const handleRating = (ratedValue) => {
        // Handle the rated value (1 to 5) as needed
        setRating(ratedValue);
      };

      const [modalVisible, setModalVisible] = useState(false);

      const handleImagePress = () => {
        setModalVisible(true);
      };
    
      const handleModalClose = () => {
        setModalVisible(false);
      };

    return(
        <View style={{borderWidth:1,padding:15, borderRadius:4, marginTop:20, borderColor:'#E4E4E4',}}>
        <View style={{flexDirection:'row',   }}>
        {imageSource ? (
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={require('../../assets/images/services.png')}  style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      ) : null}
            
            <View style={{ marginLeft:5,}}>
                
                <Text style={styles.taskTitle}>Laundry</Text>
                <Text style={{fontSize:12, color:'#7E7E7E',  marginBottom:10,  marginTop:8, maxWidth:imageSource ? 257:303,}}>Lorem ipsum dolor sit amet consectetur. Commodo fames viverra est eget nec feugiat augue semper dolor.</Text>

                
            </View>
            <TouchableOpacity>

                <Text style={{fontSize:10, fontWeight:'400', color:'#C11414',right:imageSource ? 70:50}}>Cancel Task</Text>
            </TouchableOpacity>

        </View>
        <View style={styles.detailsContainer}>
            <View style={styles.itemDetailsContainer}>
            <Location size={16} color='#7E7E7E'/>
            <Text style={styles.locationText}>Ikorodu, Lagos</Text>
        </View>
        <View style={styles.itemDetailsContainer}> 
            <DollarSquare size={16} color='#7E7E7E'/>
            <Text style={styles.paymentText}>Wallet</Text>
        </View>
        </View>
        <Text style={styles.budgetText}>Budget: N6,000</Text>
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
        <TouchableOpacity  style={styles.ViewBidButton} onPress={()=>navigation.navigate('Track')}>
                <Text style={styles.ViewBidText}>Track Task</Text>
            </TouchableOpacity>

            
        <Modal transparent={true} visible={modalVisible} onRequestClose={handleModalClose}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={handleModalClose}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/services.png')} style={styles.enlargedImage} />
          </View>
        </Modal>
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

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalCloseButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        zIndex: 1,
      },
      modalCloseText: {
        color: 'white',
        fontSize: 16,
      },
      enlargedImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
      },
})

export default InProgressTask;