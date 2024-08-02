import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch , faEdit, faLocationDot, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import {Edit, Location, DollarSquare } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmationModal from './ConfirmationModal';
import api from './Api'
import {useToast} from "./ToastProvider"
const PendingTask = ({navigation, task, imageSource}) => {
    const service = task;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showToast = useToast();
    const cancelTask = async (taskId, loginToken,) => {
        try {
          const response = await api.put(
            `user/job/${taskId}/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${loginToken}`,
              },
            }
          );
          return response.data;
        } catch (error) {
          console.error('Failed to cancel task', error);
          throw error;
        }
      };

      const handleCancel = async () => {
        try {
            setIsModalVisible(false);
          const loginToken = await AsyncStorage.getItem('logintoken');
          await cancelTask(task.id, loginToken);
          showToast( 'The task has been successfully canceled.');
          // Optionally, refresh the task list or navigate away
        } catch (error) {
          showToast( 'Failed to cancel the task. Please try again.');
        }
      };
      const handleCancelTask = () => {
        setIsModalVisible(true);
      };

      const handleConfirm = () => {
        setIsModalVisible(false);
        // Handle cancellation logic here
        console.log('Task canceled');
      };
      const handleImagePress = () => {
        setIsModalVisible(true);
      };
    return(
        <View style={{borderWidth:1,padding:15, borderRadius:4, marginTop:20, borderColor:'#E4E4E4',}}>
            <View style={{flexDirection:'row', }}>
                        {imageSource ? (
                    <TouchableOpacity onPress={handleImagePress}>
                    <Image source={imageSource}  style={{ width: 50, height: 50, marginRight:10, }} />
                    </TouchableOpacity>
                ) : null}
                <View>

                <View style={{flexDirection:'row', gap:5, }}>
                    <Text style={styles.taskTitle}>{task.subject}</Text>
                    <TouchableOpacity  onPress={() => navigation.navigate('EditableForm', { service, navigation})}>

                    <Edit size={18} color='black'/>
                    </TouchableOpacity>
                </View>
                
                     <Text style={{fontSize:12, color:'#7E7E7E', width:303, height:36, marginTop:8, maxWidth:imageSource ? 257:303,}}>{task.description}</Text>
                </View>
                <TouchableOpacity onPress={handleCancelTask}>

                    <Text style={{fontSize:10, fontWeight:'400', color:'#C11414', alignSelf:'center', right:imageSource ? 70:50 }}>Cancel Task</Text>
                </TouchableOpacity>

            </View>
                            <ConfirmationModal
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            <View style={styles.detailsContainer}>
                <View style={styles.itemDetailsContainer}>
                <Location size={16} color='#7E7E7E'/>
                <Text style={styles.locationText}>{task.location}</Text>
            </View>

            </View>
            <Text style={styles.budgetText}>Budget: N{task.budget}</Text>
            <TouchableOpacity  style={styles.ViewBidButton} onPress={() => navigation.navigate('Bids', { task })}>
                    <Text style={styles.ViewBidText}>View Bids</Text>
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
        width:300,
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
    }
})

export default PendingTask;